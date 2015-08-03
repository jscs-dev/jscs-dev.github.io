console.log('Collecting data...');

var path = require('path');
require('./buildData').then(function() {

    console.log('Done.');

    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('../webpack.config');

    var server = new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true
    });

    server.use(/.*\.html$/, function(req, res) {
        res.sendFile(path.join(__dirname, '..', '/index.html'));
    });

    server.listen(3000, 'localhost', function(err, result) {
        if (err) {
            console.log(err);
        }

        setTimeout(function() {
            console.log('Listening at http://localhost:3000/');
        }, 10000);
    });
}).done();
