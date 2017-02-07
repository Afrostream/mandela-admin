'use strict';
var express = require('express');
var path = require('path');

var middlewareAuth = require('./middlewares/middleware-auth.js');
var middlewareDevHttpProxy = require('http-proxy-middleware');
var middlewareDumpPostdata = require('./middlewares/middleware-dumppostdata.js');

// pre-configured express app
var AfrostreamNodeApp = require('afrostream-node-app');
var app = AfrostreamNodeApp.create();
app.use(middlewareDumpPostdata());
app.use(middlewareAuth());

app.set('appPath', path.resolve(__dirname, '..', '..', 'client', 'build'));

switch (process.env.NODE_ENV) {
  case 'production':
    //case 'staging':
    break;
  default:
    //var middlewareLiveReload = require('connect-livereload');
    var middlewareErrorHandler = require('errorhandler');
    var mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node|api|auth\/)).*$/;
    app.use(mayProxy, middlewareDevHttpProxy(pathname => mayProxy.test(pathname), {
      target: 'http://localhost:3002/',
      logLevel: 'silent',
      ws: true,
      secure: false,
      changeOrigin: true
    }));
    //app.use(middlewareLiveReload());
    app.use(middlewareErrorHandler());
    break;
}

app.use(express.static(app.get('appPath')));

var routes = require('./routes.js');
app.use(routes);

module.exports = app;
