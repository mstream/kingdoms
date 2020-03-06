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
                    configFile: '../babel-server.config.js',
                },
            },
        ],
    },
};
