"use strict";

var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var staticFolder = path.join(__dirname, '..', 'result');

var app = express();
var PORT = 3000;

app.use(serveStatic(staticFolder, {
    index: 'index.html',
    extensions: ['html']
}));

app.listen(PORT, function() {
    console.log('Test server started on ' + PORT + ' port');
});
