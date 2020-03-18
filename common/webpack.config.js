const CircularDependencyPlugin = require('circular-dependency-plugin');

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
                    configFile: '../babel-common.config.js',
                },
            },
        ],
    },
    plugins: [
        new CircularDependencyPlugin({
            allowAsyncCycles: false,
            cwd: process.cwd(),
            exclude: /node_modules/,
            failOnError: true,
        }),
    ],
};
