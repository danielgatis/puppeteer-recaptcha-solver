# Puppeteer Recaptcha Solver

![demo](demo.gif)

## Sponsors

<a href="https://www.capsolver.com/?utm_source=github&utm_medium=banner_github&utm_campaign=puppeter_recaptcha_solver">
  <img src="capsolver.jpg" />
</a>

[Capsolver.com](https://www.capsolver.com/?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver) is an AI-powered service that specializes in solving various types of captchas automatically. It supports captchas such as [reCAPTCHA V2](https://docs.capsolver.com/guide/captcha/ReCaptchaV2.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), [reCAPTCHA V3](https://docs.capsolver.com/guide/captcha/ReCaptchaV3.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), [hCaptcha](https://docs.capsolver.com/guide/captcha/HCaptcha.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), [FunCaptcha](https://docs.capsolver.com/guide/captcha/FunCaptcha.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), [DataDome](https://docs.capsolver.com/guide/captcha/DataDome.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), [AWS Captcha](https://docs.capsolver.com/guide/captcha/awsWaf.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), [Geetest](https://docs.capsolver.com/guide/captcha/Geetest.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), and Cloudflare [Captcha](https://docs.capsolver.com/guide/antibots/cloudflare_turnstile.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver) / [Challenge 5s](https://docs.capsolver.com/guide/antibots/cloudflare_challenge.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), [Imperva / Incapsula](https://docs.capsolver.com/guide/antibots/imperva.html?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), among others.
For developers, Capsolver offers API integration options detailed in their [documentation](https://docs.capsolver.com/?utm_source=github&utm_medium=banner_github&utm_campaign=puppeteer-recaptcha-solver), facilitating the integration of captcha solving into applications. They also provide browser extensions for [Chrome](https://chromewebstore.google.com/detail/captcha-solver-auto-captc/pgojnojmmhpofjgdmaebadhbocahppod) and [Firefox](https://addons.mozilla.org/es/firefox/addon/capsolver-captcha-solver/), making it easy to use their service directly within a browser. Different pricing packages are available to accommodate varying needs, ensuring flexibility for users.

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

## Known issues

![](https://user-images.githubusercontent.com/3437378/82528851-b14e5a80-9b07-11ea-9f30-6f4fbef0ff1f.png)

Sometimes you are blocked because of the reputation of the tor's IPs. To avoid this, you can try to buy some residential proxies or run a simple version of the demo without a proxy.

```
$ node examples/demo-wo-proxy.js
```

## Buy me a coffee
Liked some of my work? Buy me a coffee (or more likely a beer)

<a href="https://www.buymeacoffee.com/danielgatis" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;"></a>
