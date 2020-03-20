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
            CLIENT_ID: JSON.stringify('db45f04jpvg84h71ij9u46lgg'),
            USER_POOL_ID: JSON.stringify('eu-west-1_51o0hoJwW'),
        }),
    ],
};
