'use strict';
var express = require('express');
var path = require('path');

var middlewareAuth = require('./middlewares/middleware-auth.js');
var middlewareDumpPostdata = require('./middlewares/middleware-dumppostdata.js');

// pre-configured express app
var AfrostreamNodeApp = require('afrostream-node-app');
var app = AfrostreamNodeApp.create();
app.use(middlewareDumpPostdata());
app.use(middlewareAuth());

app.set('appPath', path.resolve(__dirname, '..', '..', 'client', 'build'));

switch (process.env.NODE_ENV) {
  case 'production':
  case 'staging':
    break;
  default:
    var middlewareLiveReload = require('connect-livereload');
    var middlewareErrorHandler = require('errorhandler');
    app.use(middlewareLiveReload());
    app.use(middlewareErrorHandler());
    break;
}

app.use(express.static(app.get('appPath')));

var routes = require('./routes.js');
app.use(routes);

module.exports = app;
