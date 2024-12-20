const puppeteer = require("puppeteer");
const fs = require("fs");

async function SourceCodeGenerator(url, outputData) {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(url);

    const sourceCode = await page.content();

    fs.writeFileSync(outputData, sourceCode, "utf-8");

    await browser.close();
    console.log("Successfully executed");
  } catch (err) {
    console.log(err);
  }
}

const url = "https://www.emirates.com/us/english/";
const outputData = "output.html";

SourceCodeGenerator(url, outputData);
