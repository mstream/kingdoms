const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
    },
    target: 'node',
    mode: process.env.NODE_ENV || 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    configFile: '../babel-tools.config.js',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CLIENT_ID: JSON.stringify('78pgeo0bb3r0mg1hat0qajtrap'),
            USER_POOL_ID: JSON.stringify('eu-west-1_mkASaFh00'),
        }),
    ],
};
