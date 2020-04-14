const CircularDependencyPlugin = require(
    `circular-dependency-plugin`,
);

const utils = require(
    `../utils`,
);

const createToolsConfig = (
    {
        globalVariablesCreator,
        mode,
        projectPath,
    },
) => {

    const circularDependencyPlugin = new CircularDependencyPlugin(
        {
            allowAsyncCycles: false,
            cwd             : process.cwd(),
            exclude         : /node_modules/,
            failOnError     : true,
        },
    );

    const definePlugin = utils.createDefinitionPlugin(
        {
            globalVariablesCreator,
        },
    );

    return {
        entry    : `./tools/src/index.js`,
        externals: [
            `aws-sdk`,
            `ioredis`,
        ],
        mode,

        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    loader : `babel-loader`,
                    options: {
                        configFile: `./babel-tools.config.js`,
                    },
                    test: /\.(js|jsx)$/,
                },
            ],
        },

        output: {
            path: `${ projectPath }/tools/dist`,
        },


        plugins: [
            circularDependencyPlugin,
            definePlugin,
        ],

        resolve: {
            extensions: [
                `.js`,
            ],
        },

        target: `node`,
    };

};

module.exports = createToolsConfig;
