module.exports = {
    env: {
        browser: true,
        es6    : true,
        node   : true,
    },
    extends: [
        `eslint:recommended`,
        `plugin:flowtype/recommended`,
        `plugin:import/errors`,
        `plugin:import/warnings`,
        `plugin:jest/recommended`,
        `plugin:jest/style`,
        `plugin:promise/recommended`,
        `plugin:react/recommended`,
        `plugin:react-hooks/recommended`,
        `plugin:testcafe/recommended`,
    ],
    globals: {
        Atomics           : `readonly`,
        CLIENT_ID         : `readonly`,
        COGNITO_URL       : `readonly`,
        HTTP_API_URL      : `readonly`,
        LOGGING_LEVEL     : `readonly`,
        SharedArrayBuffer : `readonly`,
        VERSION           : `readonly`,
        WEB_SOCKET_API_URL: `readonly`,
    },
    overrides: [
        {
            files: [
                `tests/**`,
            ],
            rules: {
                'jest/expect-expect'   : `off`,
                'jest/no-test-callback': `off`,
            },
        },
    ],
    parser       : `babel-eslint`,
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType : `module`,
    },
    plugins: [
        `autofix`,
        `filenames`,
        `flowtype`,
        `import`,
        `jest`,
        `promise`,
        `react`,
        `react-hooks`,
        `sort-imports-es6-autofix`,
        `testcafe`,
    ],
    rules: require(
        `./rules`,
    ),
};
