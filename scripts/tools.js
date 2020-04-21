const npsUtils = require(
    `nps-utils`,
);

module.exports = {
    cleanOnly: {
        script: `rimraf tools/dist`,
    },
    test: {
        script: npsUtils.series.nps(
            `checkCode`,
            `tools.testOnly`,
        ),
    },
    testOnly: {
        script: `jest --config tools/jest.config.js tools`,
    },
};
