const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')

const solve = require('../index.js')

async function run () {
  puppeteer.use(pluginStealth())

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=360,500', '--window-position=000,000', '--no-sandbox', '--disable-dev-shm-usage', '--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials']
  })

  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  page.goto('https://www.google.com/recaptcha/api2/demo')

  solve(page)
}

console.log('`ctrl + c` to exit')
process.on('SIGINT', () => {
  console.log('bye!')
  process.exit()
})

run()
