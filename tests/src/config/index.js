// @flow

// $FlowFixMe
import globals from '../../../globals';

import type {
    Config,
} from './types';

const env = process.env.NODE_ENV;

if ( env == null ) {

    throw Error(
        `missing NODE_ENV environmental variable`,
    );

}

const globalVariablesCreators = {
    dev : globals.createDevVariables,
    prod: globals.createProdVariables,
};

const createConfig: () => Config = () => {

    const globalVariablesCreator = globalVariablesCreators[ env ];

    if ( globalVariablesCreator == null ) {

        throw Error(
            `unsupported environment '${ env }'`,
        );

    }

    const globalVariables = globalVariablesCreator();

    const getGlobalVariable = (
        {
            name,
        }: { name: string },
    ): string => {

        const variable = globalVariables[ name ];

        if ( variable == null ) {

            const serializedGlobalVariables = JSON.stringify(
                globalVariables,
            );

            const errorMessage
                = `variable '${ name }' is missing in global variables for '${ env }' environment:`
                + ` ${ serializedGlobalVariables }`;

            throw Error(
                errorMessage,
            );

        }

        return variable;

    };

    return {
        appUrl: getGlobalVariable(
            {
                name: `APP_URL`,
            },
        ),
        clientId: getGlobalVariable(
            {
                name: `CLIENT_ID`,
            },
        ),
        cognitoUrl: getGlobalVariable(
            {
                name: `COGNITO_URL`,
            },
        ),
        destroyWorldFunctionName: getGlobalVariable(
            {
                name: `DESTROY_WORLD_FUNCTION_ID`,
            },
        ),
        loggingLevel: getGlobalVariable(
            {
                name: `LOGGING_LEVEL`,
            },
        ),
        region: getGlobalVariable(
            {
                name: `REGION`,
            },
        ),
        resetStateFunctionName: getGlobalVariable(
            {
                name: `RESET_STATE_FUNCTION_ID`,
            },
        ),
        userPoolId: getGlobalVariable(
            {
                name: `USER_POOL_ID`,
            },
        ),
        webSocketUrl: getGlobalVariable(
            {
                name: `WEB_SOCKET_URL`,
            },
        ),
    };

};

export const config = createConfig();
