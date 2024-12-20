const puppeteer = require("puppeteer");

async function generatedPdf(url, outputfile) {
  try {
    //launch browser
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto(url);

    await page.pdf({ path: outputfile, format: "A4" });

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

const url = "https://www.nike.com/";
const outputfile = "output.pdf";

generatedPdf(url, outputfile);
