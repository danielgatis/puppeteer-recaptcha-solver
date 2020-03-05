# Puppeteer Recatpcha Solver

![demo](demo.gif)

## How to use

First of all, install and run the [tor project](https://www.torproject.org/) on your machine. Mac OS example:

```sh
  $ brew install tor
  $ mkdir -p /usr/local/etc/torc
  $ echo 'SocksPort 9060\nSocksPort 9061\nSocksPort 9062\nSocksPort 9063\nSocksPort 9064\nSocksPort 9065' > /usr/local/etc/tor/torrc
  $ tor CookieAuthentication 1 ControlPort 9051 HashedControlPassword 16:DB4D0D522B4946F560DBA4D9B0E47C8BA3BC2A3F7CD69C4E30581900BF
```

Clone this project and run [examples/demo.js](examples/demo.js):

```sh
  $ git clone https://github.com/danielgatis/puppeteer-recaptcha-solver.git
  $ cd puppeteer-recaptcha-solver
  $ npm install
  $ node examples/demo.js
```
