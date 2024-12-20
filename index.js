const puppteere = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppteere.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.nike.com/");

  const title = await page.title();

  const metaDescription = await page.$eval(
    'meta[name="description"]',
    (element) => element.textContent
  );
  const metaKeywords = await page.$eval(
    'meta[name="description"]',
    (element) => element.textContent
  );

  const links = await page.$$eval("a", (elements) =>
    elements.map((element) => ({
      src: element.href,
      text: element.textContent,
    }))
  );

  const images = await page.$$eval("img", (elements) =>
    elements.map((element) => ({
      src: element.src,
      alt: element.alt,
    }))
  );

  const imgCount = images.length;
  const linksCount = links.length;

  const output = {
    title,
    metaDescription,
    metaKeywords,
    images,
    links,
    imgCount,
    linksCount,
  };

  //Counvert JSON into string

  const counvert = JSON.stringify(output);

  fs.writeFileSync("output.json", counvert);
  await browser.close();
}

run();
