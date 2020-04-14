module.exports = {
    clearMocks     : true,
    collectCoverage: true,
    globals        : {
        CLIENT_ID     : `CLIENT_ID`,
        COGNITO_URL   : `COGNITO_URL`,
        WEB_SOCKET_URL: `WEB_SOCKET_URL`,
    },
    moduleNameMapper: {
        '\\.(bmp|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            `<rootDir>/__mocks__/file-mock.js`,
        '\\.(css|less)$': `<rootDir>/__mocks__/style-mock.js`,
    },
    testEnvironment: `jsdom`,
    transform      : {
        '\\.js$': [
            `babel-jest`,
            {
                configFile: `./babel-client.config.js`,
            },
        ],
    },
};
