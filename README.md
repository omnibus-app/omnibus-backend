# Omnibus

[![Build Status](https://img.shields.io/travis/omnibus-app/omnibus-backend.svg?style=flat)](https://travis-ci.org/omnibus-app/omnibus-backend)
[![Coverage Status](https://img.shields.io/coveralls/omnibus-app/omnibus-backend.svg?style=flat)](https://coveralls.io/r/omnibus-app/omnibus-backend)

> Omnibus is a hybrid web service/node module that provides a clean API for accessing data concerning the activities of the US Congress.

## Using Omnibus

### Deploying as a web service
Omnibus includes a deployable [Express]() application. The app exposes an HTTP interface that mirrors the JavaScript API.

### Using as a module
Omnibus exposes a JavaSCript API; simply `require()` the module.

### Using as a router
Finally, Omnibus provides access to its application router. This allows an existing Express application to incorporate the HTTP interface with a simple one-liner.
