import { objSorting } from "./util.js"

var printReport = function(pages) {
    const objSort = objSorting(pages);
    objSort.forEach(obj => {
        const [url, count] = obj;
        console.log(`Found ${count} internal link${count > 1 ? 's' : ''} to ${url.normalize()}`)
    });
}

export { printReport }