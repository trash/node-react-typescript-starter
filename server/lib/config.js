"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var rootPath = path.normalize(__dirname + '/../../');
var clientRootPath = path.normalize(rootPath + '/client');
console.log(rootPath, clientRootPath);
/**
* Express configuration
*/
exports.config = function (app) {
    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
        if (req.url.indexOf('/scripts/') === 0) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
        }
        next();
    });
    app.use(express.static(path.join(clientRootPath, '.tmp')));
    app.use(express.static(path.join(clientRootPath, '/build')));
    app.use(express.static(path.join(clientRootPath, '/images')));
    app.use(express.static(path.join(clientRootPath, '/')));
    app.set('views', clientRootPath + '/build');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    // app.use(express.json());
    // app.use(express.urlencoded());
    // app.use(express.methodOverride());
    // app.use(express.cookieParser());
    // Error handler
    // app.use(express.errorHandler());
};
