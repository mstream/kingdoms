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
                test: /\.bmp$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ]
};