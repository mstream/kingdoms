const createClientConfig = require(
    `./webpack/config/client`,
);

const createServerConfig = require(
    `./webpack/config/server`,
);

const createToolsConfig = require(
    `./webpack/config/tools`,
);

const globals = require(
    `./globals`,
);

const env = process.env.NODE_ENV;
const target = process.env.TARGET;

if ( env == null ) {

    throw Error(
        `missing NODE_ENV environmental variable`,
    );

}

const globalVariablesCreators = {
    dev : globals.createDevVariables,
    prod: globals.createProdVariables,
};

const modes = {
    dev : `development`,
    prod: `production`,
};

const modeForEnvironment = modes[ env ];
const globalVariablesCreator = globalVariablesCreators[ env ];

if ( modeForEnvironment == null || globalVariablesCreator == null ) {

    throw Error(
        `unsupported environment '${ env }'`,
    );

}

const configCreators = {
    client: createClientConfig,
    server: createServerConfig,
    tools : createToolsConfig,
};

const configCreator = configCreators[ target ];

if ( configCreator == null ) {

    throw Error(
        `unknown target: ${ target }`,
    );

}

module.exports = configCreator(
    {
        env,
        globalVariablesCreator,
        mode       : modeForEnvironment,
        projectPath: __dirname,
    },
);
