const HtmlWebPackPlugin = require('html-webpack-plugin');
const tailwindcssPlugin = require('tailwindcss');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MinimizeFontsPlugin = require('./webpack/minimize-fonts-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

const exclusions = [
    /coverage/,
    /dist/,
    /node_modules/,
];

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: exclusions,
                loader: 'babel-loader',
                options: {
                    configFile: '../babel-client.config.js',
                },
            },
            {
                test: /\.(ani|bmp|cur|ico|png|svg|ttf|woff2)$/i,
                exclude: exclusions,
                loader: 'file-loader',
            },
            {
                test: /\.css$/,
                exclude: exclusions,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [tailwindcssPlugin],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CLIENT_ID: JSON.stringify('db45f04jpvg84h71ij9u46lgg'),
            COGNITO_URL: JSON.stringify('https://dev-kingdoms.auth.eu-west-1.amazoncognito.com'),
            WEB_SOCKET_URI: JSON.stringify('wss://55oob8wdab.execute-api.eu-west-1.amazonaws.com/Stage'),
        }),
        new PurgecssPlugin({
            defaultExtractor: content => content.match(/[\w-\/:]+(?<!:)/g) || [],
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebPackPlugin({
            favicon: './src/assets/images/favicon.ico',
            filename: './index.html',
            template: './src/assets/html/index.html',
        }),
        new HtmlWebPackPlugin({
            favicon: './src/assets/images/favicon.ico',
            filename: './error.html',
            template: './src/assets/html/error.html',
        }),
        new MinimizeFontsPlugin(),
        new CircularDependencyPlugin({
            allowAsyncCycles: false,
            cwd: process.cwd(),
            exclude: /node_modules/,
            failOnError: true,
        }),
    ],
};
