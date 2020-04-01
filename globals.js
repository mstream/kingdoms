const createDevVariables = () => {
    const devVariables = require('./server/dist/dev/service.js');

    return {
        APP_URL: devVariables['WebsiteUrl'],
        CLIENT_ID: devVariables['UserPoolClientId'],
        COGNITO_URL: devVariables['AuthWebsiteUrl'],
        USER_POOL_ID: devVariables['UserPoolId'],
        WEB_SOCKET_URL: devVariables['WebSocketUrl'],
    };
};


const createProdVariables = () => {
    const prodVariables = require('./server/dist/prod/service.js');

    return {
        APP_URL: prodVariables['WebsiteUrl'],
        CLIENT_ID: prodVariables['UserPoolClientId'],
        COGNITO_URL: prodVariables['AuthWebsiteUrl'],
        USER_POOL_ID: prodVariables['UserPoolId'],
        WEB_SOCKET_URL: prodVariables['WebSocketUrl'],
    };
};

module.exports = {
    createDevVariables,
    createProdVariables,
};
