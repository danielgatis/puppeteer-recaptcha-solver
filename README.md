# Puppeteer Recaptcha Solver

![demo](demo.gif)

## How to use

First of all, install and run the [tor project](https://www.torproject.org/) on your machine. Mac OS example:

```sh
  $ brew install tor
  $ mkdir -p /usr/local/etc/tor && echo 'SocksPort 9060\nSocksPort 9061\nSocksPort 9062\nSocksPort 9063\nSocksPort 9064\nSocksPort 9065' > /usr/local/etc/tor/torrc
  $ tor CookieAuthentication 1 ControlPort 9051 HashedControlPassword 16:DB4D0D522B4946F560DBA4D9B0E47C8BA3BC2A3F7CD69C4E30581900BF
```

Clone this project and run [examples/demo.js](examples/demo.js):

```sh
  $ git clone https://github.com/danielgatis/puppeteer-recaptcha-solver.git
  $ cd puppeteer-recaptcha-solver
  $ npm install
  $ node examples/demo.js
```
<!-- AD -->
---
## Sponsors

✅ CapMonster.Cloud — Fast, Reliable CAPTCHA Solving for Automation & Scraping

[![CapMonster Cloud](https://help.zennolab.com/upload/u/02/020538b7c128.png)](https://capmonster.cloud/en/?utm_source=github&utm_campaign=danielgatis_puppeteer-recaptcha-solver)

If you are tired of wasting time solving endless CAPTCHAs during scraping, automation, or testing — we’ve got a solution for you.  
Meet CapMonster.Cloud — the AI-powered CAPTCHA solving service trusted by thousands of users worldwide. 🚀

--

🔥 **Why users love CapMonster.Cloud**
  
💡 Very high success rates (up to 99%)  
⚡ Super fast solving times  
💲 Affordable transparent pricing (pay per 1,000 CAPTCHAs)  
🔌 Easy integration via API + browser extensions  
⭐ Excellent reviews on TrustPilot, SourceForge, SaaSHub, AlternativeTo

--

🔗 **Useful Links**

💲 [Pricing & Supported CAPTCHA Types (25+ types supported)](https://capmonster.cloud/en?utm_source=github&utm_campaign=danielgatis_puppeteer-recaptcha-solver#new-plans)  
📘 [API Documentation](https://docs.capmonster.cloud/?utm_source=github&utm_campaign=danielgatis_puppeteer-recaptcha-solver)  
💡 Main Website → [capmonster.cloud](https://capmonster.cloud/en/?utm_source=github&utm_campaign=danielgatis_puppeteer-recaptcha-solver)  
⭐ Reviews → [TrustPilot](https://www.trustpilot.com/review/capmonster.cloud)

---
<!-- /AD -->

## Known issues

![](https://user-images.githubusercontent.com/3437378/82528851-b14e5a80-9b07-11ea-9f30-6f4fbef0ff1f.png)

Sometimes you are blocked because of the reputation of the tor's IPs. To avoid this, you can try to buy some residential proxies or run a simple version of the demo without a proxy.

```
$ node examples/demo-wo-proxy.js
```

## Buy me a coffee
Liked some of my work? Buy me a coffee (or more likely a beer)

<a href="https://www.buymeacoffee.com/danielgatis" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;"></a>
