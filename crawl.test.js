import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML, fetchCrawlPage } from "./functions/crawl.js";

    
test('url from html', () => {
    expect(getURLsFromHTML(html, 'https://www.wagslane.dev/')).toBe(`<a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>`);
});


// test('normalize url', () => {
//     expect(normalizeURL('https://www.wagslane.dev/hi')).toBe('');
// });

// test('normalize url', () => {
//     expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
// });

// test('normalize url', () => {
//     expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
// });

// test('normalize url', () => {
//     expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
// });