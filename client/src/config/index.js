// @flow

import type {
    Config,
} from './types';


export const createConfig: () => Config = () => {

    return {
        clientId       : CLIENT_ID,
        cognitoUrl     : COGNITO_URL,
        httpApiUrl     : HTTP_API_URL,
        loggingLevel   : LOGGING_LEVEL,
        version        : VERSION,
        webSocketApiUrl: WEB_SOCKET_API_URL,
    };

};


export const emptyConfig: Config = {
    clientId       : ``,
    cognitoUrl     : ``,
    httpApiUrl     : ``,
    loggingLevel   : ``,
    version        : ``,
    webSocketApiUrl: ``,
};
