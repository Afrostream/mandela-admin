'use strict';
var express = require('express');
var path = require('path');
var config = require('../config');
//var favicon = require('serve-favicon');

var middlewareAuth = require('./middlewares/middleware-auth.js');
var middlewareDumpPostdata = require('./middlewares/middleware-dumppostdata.js');

// pre-configured express app
var AfrostreamNodeApp = require('afrostream-node-app');
var app = AfrostreamNodeApp.create();
app.use(middlewareDumpPostdata());
app.use(middlewareAuth());

switch (process.env.NODE_ENV) {
  case 'production':
  case 'staging':
    app.set('appPath', path.resolve(__dirname, '..', '..', 'client', 'build'));
    app.set('docPath', path.join(global.__basedir, 'dist', 'apidoc'));
    //app.use(favicon(path.join(global.__basedir, 'dist', 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    break;
  default:
    var middlewareLiveReload = require('connect-livereload');
    var middlewareErrorHandler = require('errorhandler');

    app.use(middlewareLiveReload());
    app.use(middlewareErrorHandler());
    app.set('appPath', path.resolve(__dirname, '..', '..', 'client', 'build'));
    app.use(express.static(path.join(global.__basedir, '.tmp')));
    app.use(express.static(app.get('appPath')));
    break;
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require('./routes.js');
app.use(routes);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
