const HtmlWebPackPlugin = require('html-webpack-plugin');
const tailwindcssPlugin = require('tailwindcss');
const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    rootMode: 'upward'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [tailwindcssPlugin]
                        }
                    }
                ]
            },
            {
                test: /\.(bmp|eot|gif|png|jpe?g|svg|ttf|woff|woff2|xml)$/i,
                loader: 'file-loader'
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/assets/html/index.html',
            filename: './index.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/assets/html/error.html',
            filename: './error.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new PurgecssPlugin({
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
    ]
};