// $Flow

const npsUtils = require(
    `nps-utils`,
);

module.exports = {
    test: {
        script: npsUtils.series.nps(
            `checkCode`,
            `common.testOnly`,
        ),
    },
    testOnly: {
        script: `jest --config common/jest.config.js common`,
    },
};
