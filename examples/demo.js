const puppeteer = require('puppeteer')
const solve = require('../index.js')

async function run () {
  const browser1 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=0,0']
  })

  const browser2 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=640,0']
  })

  const browser3 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=0,800']
  })

  const browser4 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=640,800', '--window-position=640,800']
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
