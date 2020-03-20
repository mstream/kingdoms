const AwsSamPlugin = require('aws-sam-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const awsSamPlugin = new AwsSamPlugin();

module.exports = {
    entry: () => awsSamPlugin.entry(),

    output: {
        filename: '[name]/app.js',
        libraryTarget: 'commonjs2',
        path: __dirname + '/.aws-sam/build/',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js'],
    },

    target: 'node',

    externals: ['aws-sdk', 'ioredis'],

    mode: process.env.NODE_ENV || 'production',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    configFile: '../babel-server.config.js',
                },
            },
        ],
    },

    plugins: [
        awsSamPlugin,
        new CircularDependencyPlugin({
            allowAsyncCycles: false,
            cwd: process.cwd(),
            exclude: /node_modules/,
            failOnError: true,
        }),
    ],
};
