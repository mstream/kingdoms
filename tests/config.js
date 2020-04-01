// @flow

// $FlowFixMe
import globals from '../globals';


const env = process.env.NODE_ENV;

if (env == null) {
    throw Error(`missing NODE_ENV environmental variable`);
}

const globalVariablesCreators = {
    dev: globals.createDevVariables,
    prod: globals.createProdVariables,
};

const globalVariablesCreator = globalVariablesCreators[env];

if (globalVariablesCreator == null) {
    throw Error(`unsupported environment '${env}'`);
}

const globalVariables = globalVariablesCreator();

export const config = {
    appUrl: globalVariables.APP_URL,
    clientId: globalVariables.CLIENT_ID,
    cognitoUrl: globalVariables.COGNITO_URL,
    userPoolId: globalVariables.USER_POOL_ID,
    webScoketUri: globalVariables.WEB_SOCKET_URI,
    credentials: {
        password: 'Test_123',
        username: 'test1',
    },
};
