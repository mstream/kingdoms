const fileMockExtensions = [
    `bmp`,
    `jpg`,
    `jpeg`,
    `png`,
    `gif`,
    `eot`,
    `otf`,
    `webp`,
    `svg`,
    `ttf`,
    `woff`,
    `woff2`,
    `mp4`,
    `webm`,
    `wav`,
    `mp3`,
    `m4a`,
    `aac`,
    `oga`,
].join(
    `|`,
);

const styleMockExtensions = [
    `css`,
    `less`,
].join(
    `|`,
);

const fileMockRegex = `\\.(${ fileMockExtensions })$`;
const styleMockRegex = `\\.(${ styleMockExtensions })$`;

module.exports = {
    clearMocks     : true,
    collectCoverage: true,
    globals        : {
        CLIENT_ID         : `CLIENT_ID`,
        COGNITO_URL       : `COGNITO_URL`,
        HTTP_API_URL      : `HTTP_API_URL`,
        VERSION           : `WEB_SOCKET_API_URL`,
        WEB_SOCKET_API_URL: `WEB_SOCKET_API_URL`,
    },
    moduleNameMapper: {
        [ fileMockRegex ] : `<rootDir>/__mocks__/file-mock.js`,
        [ styleMockRegex ]: `<rootDir>/__mocks__/style-mock.js`,
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
