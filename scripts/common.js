// $Flow

const npsUtils = require('nps-utils');

module.exports = {
    testOnly: {
        script: 'jest --config common/jest.config.js common',
    },
    test: {
        script: npsUtils.series.nps(
            'common.testOnly',
        ),
    },
};
