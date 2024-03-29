// $Flow

const clientScripts = require(
    `./scripts/client`,
);

const commonScripts = require(
    `./scripts/common`,
);

const serverScripts = require(
    `./scripts/server`,
);


const testsScripts = require(
    `./scripts/tests`,
);

const toolsScripts = require(
    `./scripts/tools`,
);

const npsUtils = require(
    `nps-utils`,
);

module.exports = {
    scripts: {
        checkCode: {
            script: npsUtils.series.nps(
                `checkDepsOnly`,
                `lintOnly`,
                `checkTypesOnly`,
            ),
        },
        checkDepsOnly: {
            script: `node detect-circular-dependencies.js`,
        },
        checkTypesOnly: {
            script: `flow check`,
        },
        cleanOnly: {
            script: `rimraf report`,
        },
        client: clientScripts,
        common: commonScripts,
        deploy: {
            dev: {
                script: npsUtils.series.nps(
                    `server.deploy.dev`,
                    `client.deploy.dev`,
                ),
            },
            prod: {
                script: npsUtils.series.nps(
                    `server.deploy.prod`,
                    `client.deploy.prod`,
                ),
            },
        },
        lintOnly: {
            script: `eslint --fix .`,
        },
        server: serverScripts,
        test  : {
            local: {
                script: npsUtils.series.nps(
                    `common.test`,
                    `tools.test`,
                    `server.test`,
                    `client.test`,
                ),
            },
            remote: {
                dev: {
                    script: npsUtils.series.nps(
                        `cleanOnly`,
                        `deploy.dev`,
                        `tests.test.dev`,
                    ),
                },
                prod: {
                    script: npsUtils.series.nps(
                        `cleanOnly`,
                        `deploy.prod`,
                        `tests.test.prod`,
                    ),
                },
            },
        },
        tests: testsScripts,
        tools: toolsScripts,
    },
};
