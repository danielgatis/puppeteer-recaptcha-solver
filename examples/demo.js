const puppeteer = require('puppeteer')
const solve = require('../index.js')

// to avoid IP bans get a residential proxy
// like: luminati.io

PROXY_SERVER = '127.0.0.1:9876' // YOUR PROXY HERE!

async function run () {
  const browser1 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=0,0', `--proxy-server=${PROXY_SERVER}`]
  })

  const browser2 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=640,0', `--proxy-server=${PROXY_SERVER}`]
  })

  const browser3 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=0,800', `--proxy-server=${PROXY_SERVER}`]
  })

  const browser4 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=640,800', `--proxy-server=${PROXY_SERVER}`]
  })

  const page1 = await browser1.newPage()
  const page2 = await browser2.newPage()
  const page3 = await browser3.newPage()
  const page4 = await browser4.newPage()

  await page1.goto('https://www.google.com/recaptcha/api2/demo')
  await page2.goto('https://www.google.com/recaptcha/api2/demo')
  await page3.goto('https://www.google.com/recaptcha/api2/demo')
  await page4.goto('https://www.google.com/recaptcha/api2/demo')

  solve(page1)
  solve(page2)
  solve(page3)
  solve(page4)
}

run()
