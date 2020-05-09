const GitRevisionPlugin = require(
    `git-revision-webpack-plugin`,
);

const createVariables = (
    {
        exportedVariables,
        loggingLevel,
    },
) => {

    const getVariable = (
        {
            name,
        },
    ) => {

        const variable = exportedVariables[ name ];

        if ( variable == null ) {

            throw Error(
                `missing required exported variable '${ name }'`,
            );

        }

        return variable;

    };

    return {
        APP_URL: getVariable(
            {
                name: `WebsiteUrl`,
            },
        ),
        CLIENT_ID: getVariable(
            {
                name: `UserPoolClientId`,
            },
        ),
        COGNITO_URL: getVariable(
            {
                name: `AuthWebsiteUrl`,
            },
        ),
        DESTROY_WORLD_FUNCTION_ID: getVariable(
            {
                name: `DestroyWorldFunctionId`,
            },
        ),
        HTTP_API_URL: getVariable(
            {
                name: `HttpApiUrl`,
            },
        ),
        LOGGING_LEVEL: loggingLevel,
        REGION       : getVariable(
            {
                name: `Region`,
            },
        ),
        RESET_STATE_FUNCTION_ID: getVariable(
            {
                name: `ResetStateFunctionId`,
            },
        ),
        USER_POOL_ID: getVariable(
            {
                name: `UserPoolId`,
            },
        ),
        VERSION: JSON.stringify(
            new GitRevisionPlugin()
                .version(),
        ),
        WEB_SOCKET_API_URL: getVariable(
            {
                name: `WebSocketApiUrl`,
            },
        ),
    };

};

const createDevVariables = () => {

    const exportedVariables = require(
        `./server/dist/dev/service.js`,
    );

    return createVariables(
        {
            exportedVariables,
            loggingLevel: `info`,
        },
    );

};

const createProdVariables = () => {

    const exportedVariables = require(
        `./server/dist/prod/service.js`,
    );

    return createVariables(
        {
            exportedVariables,
            loggingLevel: `warn`,
        },
    );

};

module.exports = {
    createDevVariables,
    createProdVariables,
};
