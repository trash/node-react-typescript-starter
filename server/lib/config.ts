import * as express from 'express';
import * as path from 'path';

const rootPath = path.normalize(__dirname + '/../../');
const clientRootPath = path.normalize(rootPath + '/client');

console.log(rootPath, clientRootPath);

/**
* Express configuration
*/
export const config = function (app) {
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