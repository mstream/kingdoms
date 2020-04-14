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
                `missing required exportes variable '${ name }'`,
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
        WEB_SOCKET_URL: getVariable(
            {
                name: `WebSocketUrl`,
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
            loggingLevel: `debug`,
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
