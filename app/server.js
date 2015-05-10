console.log('Collecting data...');

require('./buildData').then(function() {

    console.log('Done.');

    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('../webpack.config');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true
    }).listen(3000, 'localhost', function(err, result) {
        if (err) {
            console.log(err);
        }

        setTimeout(function() {
            console.log('Listening at http://localhost:3000/');
        }, 10000);
    });
}).done();
