var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'tmp'),
        filename: 'bundle.js',
        publicPath: '/tmp/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {test: /\.png$/, loader: 'url-loader?limit=100000'},
            {test: /\.svg$/, loader: 'url-loader?limit=100000'}
        ]
    }
};
