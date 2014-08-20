require( '../single-endpoint-test' )({
  nockRoot: 'https://congress.api.sunlightfoundation.com',
  nockPath: '/bills/search/',
  appPath: '/bills/search?q=test'
});
