// @flow

import type {
    Config,
} from './types';


export const createConfig: () => Config = () => {

    return {
        clientId    : CLIENT_ID,
        cognitoUrl  : COGNITO_URL,
        loggingLevel: LOGGING_LEVEL,
        wsUrl       : WEB_SOCKET_URL,
    };

};


export const emptyConfig = {
    clientId    : ``,
    cognitoUrl  : ``,
    loggingLevel: ``,
    wsUrl       : ``,
};
