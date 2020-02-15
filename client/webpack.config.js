const HtmlWebPackPlugin = require('html-webpack-plugin');
const tailwindcssPlugin = require('tailwindcss');

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
                    'style-loader',
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
        })
    ]
};