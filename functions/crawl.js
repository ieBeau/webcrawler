import { JSDOM } from 'jsdom';
 
var normalizeURL = function( urlString ) {
    const urlObject = new URL(urlString);
    return urlObject;
};

var getURLsFromHTML = function( htmlBody, baseURL ) {
    const dom = new JSDOM(htmlBody, { url: baseURL });
    return [...dom.window.document.querySelectorAll("a").values()];
};

var fetchCrawlPage = async function(currentURL) {
    return await fetch(currentURL)
        .then(async (res) => {
            if (res.status === 200) {
                const contentType = res.headers.get('content-type').split(";")[0];
                if (contentType === 'text/html') {
                    const html = await res.text();
                    return getURLsFromHTML(html, currentURL);
                } else {
                    console.error('Unable to fetch content-type:', contentType);
                    return;
                }
            } else if (res.status >= 400) {
                console.error(res.statusText);
            }
        })
        .catch((error => {
            console.error(error);
        }))
};

var timeoutPromise = function(promise, timeout) {
    let timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
                reject(new Error('Promise timed out'));
        }, timeout);
    });
  
    return Promise.race([promise, timeoutPromise]);
};

var crawlPage = async function( baseURL, rl, currentURL = baseURL, pages = {} ) {
    if (!currentURL) return pages;

    const normalizeBaseURL = normalizeURL(baseURL);
    const normalizeCurrentURL = normalizeURL(currentURL);
    
    if (normalizeBaseURL.hostname !== normalizeCurrentURL.hostname) return pages;
    
    let url = normalizeCurrentURL.hostname + normalizeCurrentURL.pathname
    if (Object.keys(pages).includes(url)) {
        pages[url] = ~~pages[url] + 1;
        return pages;
    } else {
        pages[url] = ~~pages[url] + 1;
    }

    let myPromise = new Promise(async (resolve, reject) => {
        resolve(await fetchCrawlPage(currentURL));
    });

    await timeoutPromise(myPromise, 2000)
    .then((res) => {
        if (Array.isArray(res)) {
            res.forEach(obj => {
                const normalizeURL = obj.href.normalize();
                crawlPage(baseURL, rl, normalizeURL, pages);
            })
        }
    })
    .catch((err) => {
        console.error('Promise timed out');
    });

    return pages;
}

export { normalizeURL, getURLsFromHTML, fetchCrawlPage, crawlPage };