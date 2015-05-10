var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        './app/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'result/assets'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map',
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('bundle.css', { allChunks: true })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            },
            {test: /\.png$/, loader: 'url-loader?limit=100000'}
        ]
    }
};
