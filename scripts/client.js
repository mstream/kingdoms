// $Flow

const npsUtils = require('nps-utils');

module.exports = {
    testOnly: 'jest --config client/jest.config.js client',
    cleanOnly: 'rimraf client/dist',
    buildOnly: {
        dev: 'env TARGET=client NODE_ENV=dev webpack',
        prod: 'env TARGET=client NODE_ENV=prod webpack',
    },
    deployOnly: {
        dev:
            'aws s3 sync --delete --acl public-read client/dist/dev/ s3://www.dev.kingdoms.maciej-laciak.com/',
        prod:
            'aws s3 sync --delete --acl public-read client/dist/prod/ s3://www.prod.kingdoms.maciej-laciak.com/',
    },
    startOnly: {
        dev: 'env TARGET=client NODE_ENV=dev webpack-dev-server --open',
        prod: 'env TARGET=client NODE_ENV=prod webpack-dev-server --open',
    },
    test: {
        script: npsUtils.series.nps(
            'checkDepsOnly',
            'checkTypesOnly',
            'client.testOnly',
        ),
    },
    build: {
        dev: {
            script: npsUtils.series.nps(
                'client.test',
                'client.cleanOnly',
                'client.buildOnly.dev',
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                'client.test',
                'client.cleanOnly',
                'client.buildOnly.prod',
            ),
        },
    },
    deploy: {
        dev: {
            script: npsUtils.series.nps(
                'client.build.dev',
                'client.deployOnly.dev',
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                'client.build.prod',
                'client.deployOnly.prod',
            ),
        },
    },
    start: {
        dev: {
            script: npsUtils.series.nps('client.startOnly.dev'),
        },
        prod: {
            script: npsUtils.series.nps('client.startOnly.prod'),
        },
    },
};
