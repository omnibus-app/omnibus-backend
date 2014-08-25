# Omnibus

[![Build Status](https://img.shields.io/travis/omnibus-app/omnibus-backend.svg?style=flat)](https://travis-ci.org/omnibus-app/omnibus-backend)
[![Coverage Status](https://img.shields.io/coveralls/omnibus-app/omnibus-backend.svg?style=flat)](https://coveralls.io/r/omnibus-app/omnibus-backend)

[![NPM](https://nodei.co/npm/omnibus.png?compact=true)](https://nodei.co/npm/omnibus/)

> Omnibus is a hybrid web service/node module that provides a clean API for accessing data on activities of the US Congress.

- <a href='#using-omnibus'>Using Omnibus</a>
  - <a href="#deploying-as-a-web-service">Deploying as a web service</a>
  - <a href="#requiring-as-a-node-module">Requiring as a Node module</a>
  - <a href="#using-as-an-express-router">Using as an Express router</a>
- <a href="#api">API</a>
  - <a href="#bills-api">Bills API</a>
  - <a href="#congress-api">Congress API</a>
  - <a href="#votes-api">Votes API</a>
- <a href="#configuration">Configuration</a>

## Using Omnibus
Omnibus is extremely versatile. It can be run as a standalone web service, incorporated as router into another Express app, or required as a node module and used through it's API directly. It can even run in the browser. Omnibus is in active development. If you'd like to see a specific endpoint added, open an issue, or better yet, a pull request. 

### Deploying as a web service
Omnibus includes a deployable [Express](expressjs.com) application. The app exposes an HTTP interface that mirrors the JavaScript API.

```sh
git clone https://github.com/omnibus-app/omnibus
cd omnibus && npm start
curl -X GET localhost:3000/api/bills/113-hr2397
```

The web service includes optional support for a Redis cache that can be used to dramatically speed up the response time of repeated requests.

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

## API
Omnibus was initially developed as a RESTful web service. A typical URL might look like this

```
/bills/:id/version
```

In exposing the underlying JavaScript API, we sought to provide an interface similar to the REST routes.

```
// REST endpoint
bills/:id/version

// JS
omnibus.bills(id).version();

// REST endpoint
bills/search?q='searchString'

// jS
omnibus.bills().search('searchString');
```

All JS examples assume that Omnibus is available as `var omnibus = require( 'omnibus' )`. All methods return promises - Omnibus uses [Bluebird]() interally. The REST endpoints assume that the router is serving at `/api`. 


## Configuration
Omnibus uses the [New York Times Congress API](http://developer.nytimes.com/docs/read/congress_api) and the [Sunlight Congress API](https://sunlightlabs.github.io/congress/), which require API keys. You'll need to get keys and configure Omnibus with them before use.

When deploying as a web service you should make them available under `process.env.NYT_CONGRESS_KEY` and `process.env.SUNLIGHT_CONGRESS_KEY` respectively. When using the JavaScript API directly, you can set configuration parameters like so:

```js
omnibus.config.set({
  'NYT_CONGRESS_KEY': 'your_nyt_key',
  'SUNLIGHT_CONGRESS_KEY': 'your_sunlight_key'
})
```

### Bills API
The bills API supports methods/endpoints for amendments, general info, text search, subjects, versions, and votes.

#### Amendments
JavaScript
```js
omnibus.bills(billId).amendments()
```

HTTP
```
/api/bills/:id/amendments
```

#### Details
JavaScript
```js
omnibus.bills(billId).details()
```

HTTP
```
/api/bills/:id
```

#### Search
JavaScript
```js
omnibus.bills().search('obamacare');
```

HTTP
```
/api/bills?q=obamacare
```

#### Subjects
JavaScript
```js
omnibus.bills(billId).subjects()
```

HTTP
```
/api/bills/:id/subjects
```

#### Versions
JavaScript
```js
omnibus.bills(billId).versions()
```

HTTP
```
/api/bills/:id/versions
```

#### Votes
JavaScript
```js
omnibus.bills(billId).votes()
```

HTTP
```
/api/bills/:id/votes
```

### Congress API
The "id" associated with a given Congress is it's number. The current Congress is 113.

#### Enacted
JavaScript
```js
omnibus.congress(id).enacted()
```

HTTP
```
/api/congress/:id/enacted
```
### Votes API

#### By Month
The "id" associated with a given month is the month in `YYYY-MM` format.

JavaScript
```js
omnibus.votes(id).month()
```

HTTP
```
/api/votes/:id
```
