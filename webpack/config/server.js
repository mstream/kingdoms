const AwsSamPlugin = require(
    `aws-sam-webpack-plugin`,
);

const CircularDependencyPlugin = require(
    `circular-dependency-plugin`,
);

const createServerConfig = (
    {
        mode,
        projectPath,
    },
) => {

    const awsSamPlugin = new AwsSamPlugin(
        {
            projects: {
                server: `./server/template.yaml`,
            },
            vscodeDebug: false,
        },
    );

    const circularDependencyPlugin
        = new CircularDependencyPlugin(
            {
                allowAsyncCycles: false,
                cwd             : process.cwd(),
                exclude         : /node_modules/,
                failOnError     : true,
            },
        );

    return {
        entry: () => {

            return awsSamPlugin.entry();

        },

        externals: [
            `axios`,
            `aws-sdk`,
            `ioredis`,
            `pino`,
            `pino-pretty`,
            `verror`,
        ],

        mode,

        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    loader : `babel-loader`,
                    options: {
                        configFile: `./babel-server.config.js`,
                    },
                    test: /\.(js|jsx)$/,
                },
            ],
        },

        output: {
            filename: (
                chunkData,
            ) => {

                return awsSamPlugin.filename(
                    chunkData,
                );

            },
            libraryTarget: `commonjs2`,
            path         : `${ projectPath }`,
        },

        plugins: [
            awsSamPlugin,
            circularDependencyPlugin,
        ],

        resolve: {
            extensions: [
                `.js`,
            ],
        },

        target: `node`,
    };

};

module.exports = createServerConfig;
