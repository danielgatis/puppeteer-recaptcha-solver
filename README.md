# Puppeteer Recatpcha Solver

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

## Known issues

![](https://user-images.githubusercontent.com/3437378/82528851-b14e5a80-9b07-11ea-9f30-6f4fbef0ff1f.png)

Sometimes you are blocked because of the reputation of the tor's IPs. To avoid this, you can try to buy some residential proxies or run a simple version of the demo without a proxy.

```
$ node examples/demo-wo-proxy.js
```

## Buy me a coffee
Liked some of my work? Buy me a coffee (or more likely a beer)

<a href="https://www.buymeacoffee.com/danielgatis" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;"></a>
