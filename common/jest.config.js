module.exports = {
    clearMocks: true,
    collectCoverage: true,
    testEnvironment: 'node',
    transform: {
        '\\.js$': ['babel-jest', { configFile: './babel-common.config.js' }],
    },
};