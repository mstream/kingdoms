// $Flow

const npsUtils = require('nps-utils');

module.exports = {
    testOnly: {
        script: 'jest --config tools/jest.config.js tools',
    },
    cleanOnly: {
        script: 'rimraf tools/dist',
    },
    buildOnly: {
        dev: {
            script: 'env TARGET=tools NODE_ENV=dev webpack',
        },
        prod: {
            script: 'env TARGET=tools NODE_ENV=prod webpack',
        },
    },
    deployOnly: {
        dev: {
            script: 'node ./tools/dist/main.js',
        },
        prod: {
            script: 'node ./tools/dist/main.js',
        },
    },
    test: {
        script: npsUtils.series.nps(
            'tools.testOnly',
        ),
    },
    build: {
        dev: {
            script: npsUtils.series.nps(
                'tools.test',
                'tools.cleanOnly',
                'tools.buildOnly.dev',
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                'tools.test',
                'tools.cleanOnly',
                'tools.buildOnly.prod',
            ),
        },
    },
    deploy: {
        dev: {
            script: npsUtils.series.nps(
                'tools.build.dev',
                'tools.deployOnly.dev',
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                'tools.build.prod',
                'tools.deployOnly.prod',
            ),
        },
    },
};