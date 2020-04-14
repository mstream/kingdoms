// $Flow

const npsUtils = require(
    `nps-utils`,
);

module.exports = {
    build: {
        dev: {
            script: npsUtils.series.nps(
                `client.test`,
                `client.cleanOnly`,
                `client.buildOnly.dev`,
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                `client.test`,
                `client.cleanOnly`,
                `client.buildOnly.prod`,
            ),
        },
    },
    buildOnly: {
        dev : `env TARGET=client NODE_ENV=dev webpack`,
        prod: `env TARGET=client NODE_ENV=prod webpack`,
    },
    cleanOnly: `rimraf client/dist`,
    deploy   : {
        dev: {
            script: npsUtils.series.nps(
                `client.build.dev`,
                `client.deployOnly.dev`,
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                `client.build.prod`,
                `client.deployOnly.prod`,
            ),
        },
    },
    deployOnly: {
        dev:
            `aws s3 sync --delete --acl public-read client/dist/dev/ s3://www.dev.kingdoms.maciej-laciak.com/`,
        prod:
            `aws s3 sync --delete --acl public-read client/dist/prod/ s3://www.prod.kingdoms.maciej-laciak.com/`,
    },
    start: {
        dev: {
            script: npsUtils.series.nps(
                `client.startOnly.dev`,
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                `client.startOnly.prod`,
            ),
        },
    },
    startOnly: {
        dev : `env TARGET=client NODE_ENV=dev webpack-dev-server --open`,
        prod: `env TARGET=client NODE_ENV=prod webpack-dev-server --open`,
    },
    test: {
        script: npsUtils.series.nps(
            `checkCode`,
            `client.testOnly`,
        ),
    },
    testOnly: `jest --config client/jest.config.js client`,
};
