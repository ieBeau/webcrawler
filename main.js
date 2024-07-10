import readline from 'node:readline';
import { crawlPage } from "./functions/crawl.js";
import { printReport } from './functions/report.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
    rl.question(`What website would you like to crawl? \n`, async (url) => {

        if (url.split(' ').length > 1) console.error('Too many arguments!');
        else if (!url.includes('.')) console.error('No url found!');
        else {
            console.log(`Crawling webpage...`);
            if (!url.includes('http')) url = 'http://' + url;

            const crawlData = await crawlPage(url, rl);
            printReport(crawlData);
        }
        
        rl.close();
    });
}

main();