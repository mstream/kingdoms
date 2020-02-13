const AwsSamPlugin = require('aws-sam-webpack-plugin');

const awsSamPlugin = new AwsSamPlugin();

module.exports = {
    entry: () => awsSamPlugin.entry(),

    output: {
        filename: '[name]/app.js',
        libraryTarget: 'commonjs2',
        path: __dirname + '/.aws-sam/build/'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js']
    },

    target: 'node',

    externals: ['aws-sdk', 'ioredis'],

    mode: process.env.NODE_ENV || 'production',

    module: {
        rules: [
            {test: /\.js$/, loader: 'babel-loader'}
        ]
    },

    plugins: [awsSamPlugin]
};