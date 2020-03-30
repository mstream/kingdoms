const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const globals = require('./globals');

const AwsSamPlugin = require('aws-sam-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const postCssTailwindCssPlugin = require('tailwindcss');
const postCssImportPlugin = require('postcss-import');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MinimizeFontsPlugin = require('./client/webpack/minimize-fonts-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');


const exclusions = [
    /coverage\//,
    /dist\//,
    /node_modules\//,
];


const awsSamPlugin = new AwsSamPlugin({
    projects: {
        server: './server/template.yaml',
    },
    vscodeDebug: false,
});

const circularDependencyPlugin = new CircularDependencyPlugin({
    allowAsyncCycles: false,
    cwd: process.cwd(),
    exclude: /node_modules/,
    failOnError: true,
});

const definitions = Object.keys(globals.variables).reduce(
    (definitions, name: string) => {
        return {
            ...definitions,
            [name]: JSON.stringify(globals.variables[name]),
        };
    },
    {},
);

const definePlugin = new webpack.DefinePlugin(definitions);

const htmlIndexPlugin = new HtmlWebPackPlugin({
    favicon: './client/src/assets/images/favicon.ico',
    filename: './index.html',
    template: './client/src/assets/html/index.html',
});

const htmlErrorPlugin = new HtmlWebPackPlugin({
    favicon: './client/src/assets/images/favicon.ico',
    filename: './error.html',
    template: './client/src/assets/html/error.html',
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
});

const minimizeFontsPlugin = new MinimizeFontsPlugin();

const purgeCssPlugin = new PurgecssPlugin({
    defaultExtractor: content => content.match(/[\w-\/:]+(?<!:)/g) || [],
    paths: glob.sync(`${path.join(__dirname, 'client/src')}/**/*`, { nodir: true }),
});

const clientConfig = {
    entry: './client/src/index.js',

    output: {
        path: path.join(__dirname, 'client/dist'),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: exclusions,
                loader: 'babel-loader',
                options: {
                    configFile: './babel-client.config.js',
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
                            plugins: [
                                postCssImportPlugin,
                                postCssTailwindCssPlugin('./client/tailwind.config.js'),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        definePlugin,
        purgeCssPlugin,
        miniCssExtractPlugin,
        htmlIndexPlugin,
        htmlErrorPlugin,
        minimizeFontsPlugin,
        circularDependencyPlugin,
    ],
};


const serverConfig = {
    entry: () => awsSamPlugin.entry(),

    output: {
        filename: (chunkData) => awsSamPlugin.filename(chunkData),
        libraryTarget: 'commonjs2',
        path: __dirname,
    },

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
                    configFile: './babel-server.config.js',
                },
            },
        ],
    },

    plugins: [
        awsSamPlugin,
        circularDependencyPlugin,
    ],
};

const toolsConfig = {
    entry: './tools/src/index.js',

    output: {
        path: path.join(__dirname, 'tools/dist'),
    },

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
                    configFile: './babel-tools.config.js',
                },
            },
        ],
    },

    plugins: [
        circularDependencyPlugin,
        definePlugin,
    ],
};


const configs = {
    'client-build': clientConfig,
    'client-start': clientConfig,
    'server-build': serverConfig,
    'tools-build': toolsConfig,
};

const target = process.env.npm_lifecycle_event;

const config = configs[target];

if (config == null) {
    throw Error(`unknown target: ${target}`);
}

module.exports = config;
