const AwsSamPlugin = require('aws-sam-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');


const createServerConfig = ({ env, globalVariablesCreator, mode, projectPath }) => {

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

    return {
        entry: () => awsSamPlugin.entry(),

        output: {
            filename: (chunkData) => awsSamPlugin.filename(chunkData),
            libraryTarget: 'commonjs2',
            path: `${projectPath}`,
        },

        resolve: {
            extensions: ['.js'],
        },

        target: 'node',

        externals: [
            'aws-sdk',
            'ioredis'
        ],

        mode,

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
};


module.exports = createServerConfig;
