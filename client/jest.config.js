module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    globals: {
        'CLIENT_ID': 'CLIENT_ID',
        'COGNITO_URL': 'COGNITO_URL',
        'WEB_SOCKET_URI': 'WEB_SOCKET_URI',
    },
    moduleNameMapper: {
        '\\.(bmp|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/file-mock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/style-mock.js',
    },
    testEnvironment: 'jsdom',
};
