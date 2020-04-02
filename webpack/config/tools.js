const CircularDependencyPlugin = require('circular-dependency-plugin');
const utils = require('../utils');

const createToolsConfig = ({
    env,
    globalVariablesCreator,
    mode,
    projectPath,
}) => {
    const circularDependencyPlugin = new CircularDependencyPlugin({
        allowAsyncCycles: false,
        cwd: process.cwd(),
        exclude: /node_modules/,
        failOnError: true,
    });

    const definePlugin = utils.createDefinitionPlugin({
        globalVariablesCreator,
    });

    return {
        entry: './tools/src/index.js',

        output: {
            path: `${projectPath}/tools/dist`,
        },

        resolve: {
            extensions: ['.js'],
        },

        target: 'node',

        externals: ['aws-sdk', 'ioredis'],

        mode,

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

        plugins: [circularDependencyPlugin, definePlugin],
    };
};

module.exports = createToolsConfig;
