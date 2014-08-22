# Omnibus

[![Build Status](https://img.shields.io/travis/omnibus-app/omnibus-backend.svg?style=flat)](https://travis-ci.org/omnibus-app/omnibus-backend)
[![Coverage Status](https://img.shields.io/coveralls/omnibus-app/omnibus-backend.svg?style=flat)](https://coveralls.io/r/omnibus-app/omnibus-backend)

> Omnibus is a hybrid web service/node module that provides a clean API for accessing data on activities of the US Congress.

- <a href='#using-omnibus'>Using Omnibus</a>
  - <a href="#deploying-as-a-web-service">Deploying as a web service</a>
  - <a href="#requiring-as-a-node-module">Requiring as a Node module</a>
  - <a href="#using-as-an-express-router">Using as an Express router</a>
- <a href="#api">API</a>
  - <a href="#http-api">HTTP API</a>
  - <a href="#javascript-api">JavaScript API</a>
- <a href="#configuration">Configuration</a>

## Using Omnibus
Omnibus is extremely versatile. It can be run as a standalone web service, incorporated as router into another Express app, or required as a node module and used through it's API directly. It can even run in the browser.

### Deploying as a web service
Omnibus includes a deployable [Express](expressjs.com) application. The app exposes an HTTP interface that mirrors the JavaScript API.

```sh
git clone https://github.com/omnibus-app/omnibus
cd omnibus && node ./bin/www 
```

### Requiring as a Node module
Omnibus exposes a JavaScript API; simply `require()` the module.

```js
var omnibus = require( 'omnibus' );
omnibus.bills( '113-HR2397' ).versions().then( /* etc */ );
```

We haven't tested it in the browser extensively but it seems to work great with [Browserify](http://browserify.org/). Yep, it's both a deployable web service and a client-side library.

### Using as an Express router
Finally, Omnibus provides access to its application router. This allows an existing Express application to incorporate the HTTP interface.

```js
app.use( '/omnibus/', require( 'omnibus/router' ) );
```

### API
Omnibus was initially developed as a RESTful web service. A typical URL might look like this

```
/bills/:id/version
```

In exposing the underlying JavaScript API, we sought to provide an interface similar to the REST routes.

```
// REST URL
bills/:id/version

// JS
omnibus.bills(id).version();

// REST URL
bills/search?q='searchString'

// jS
omnibus.bills().search('searchString');
```

### Configuration
In various places Omnibus uses the [New York Times Congress API](http://developer.nytimes.com/docs/read/congress_api) and the [Sunlight Congress API](https://sunlightlabs.github.io/congress/), which require API keys. You'll need to get keys and configure Omnibus with them before use.

When deploying as a web service you should make them available under `process.env.NYT_CONGRESS_KEY` and `process.env.SUNLIGHT_CONGRESS_KEY` respectively. In other contexts, you can set configuration parameters like so:

```js
omnibus.config.set({
  'NYT_CONGRESS_KEY': 'your_nyt_key',
  'SUNLIGHT_CONGRESS_KEY': 'your_sunlight_key'
})
```
