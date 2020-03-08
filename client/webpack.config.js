const HtmlWebPackPlugin = require('html-webpack-plugin');
const tailwindcssPlugin = require('tailwindcss');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MinimizeFontsPlugin = require('./webpack/minimize-fonts-plugin');


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
                test: /\.(bmp|ico|png|ttf|woff2)$/i,
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
        new PurgecssPlugin({
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
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
    ],
};
