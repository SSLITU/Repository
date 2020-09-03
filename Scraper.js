const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

var uname = '***********';
var pass = '********';

const techSpecList = [];
const spareList = [];

const allUrl = [];
const productType = ['pondovac-5', 'biorb-cube-60-mcr-white']; // Array med alle produkt titler med bindestreg og på rigtigt sprog!

determineUrl();

async function determineUrl() {
  let url = `https://b2bshop.oase-livingwater.com/en0015/`
  for (let i = 0; i < productType.length; i++) {
    allUrl.push({
      url: url + productType[i] + '.html'
    })
    allUrl.forEach(access);
  }
};

async function access(item) {
  console.log(item.url);
  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto('https://b2bshop.oase-livingwater.com/en0015', { waitUntil: 'networkidle2' });
  await page.type('#email', uname, { delay: 30 });
  await page.type('#pass', pass, { delay: 30 });
  await page.click('#send2');
  // Ny function så man ikke behøver at logge in hver gang.
  await page.goto(`${item.url}`, { waitUntil: 'networkidle2' });
  const content = await page.content();
  const $ = cheerio.load(content);
  $('#product-attribute-specs-table tr').each(function (i, element) {
    let key = $('th', this).html()
    let value = $('td', this).html()
    techSpecList.push({
      key: key,
      value: value
    })
    return {
      techSpecList
    }
  })
  $('.spare-parts-table tr').each(function (i, element) {
    let key = $('a', this).text()
    let value = $('td', this).html()
    if (value !== null)
      spareList.push({
        key: key,
        value: value
      })
    return {
      spareList
    }
  })
  await outPut();
  await browser.close();
  debugger;
};

async function outPut () {
  // Compress to NDJSON file
  console.log(techSpecList);
  console.log(spareList);
}