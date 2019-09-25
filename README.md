# Puppeteer Recatpcha Solver

![demo](demo.gif)

## How to use

First of all, install and run the [tor project](https://www.torproject.org/) on your machine. Mac OS example:

```sh
  $ brew install tor
  $ brew services stop tor
  $ tor CookieAuthentication 1 ControlPort 9051 HashedControlPassword 16:DB4D0D522B4946F560DBA4D9B0E47C8BA3BC2A3F7CD69C4E30581900BF
  $ curl --socks5 localhost:9050 --socks5-hostname localhost:9050 -s https://check.torproject.org/ | cat | grep -m 1 Congratulations | xargs
```

Clone this project and run [examples/demo.js](examples/demo.js):

```sh
  $ cd puppeteer-recaptcha-solver
  $ npm install
  $ node examples/demo.js
```
