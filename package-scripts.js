// $Flow

const clientScripts = require('./scripts/client');
const commonScripts = require('./scripts/common');
const serverScripts = require('./scripts/server');
const toolsScripts = require('./scripts/tools');

const npsUtils = require('nps-utils');

module.exports = {
    scripts: {
        common: commonScripts,
        tools: toolsScripts,
        client: clientScripts,
        server: serverScripts,
        checkDepsOnly: {
            script: 'node detect-circular-dependencies.js',
        },
        checkTypesOnly: {
            script: 'flow check',
        },
        testOnly: {
            remote: {
                dev: {
                    script: 'env NODE_ENV=dev testcafe chrome tests/scenarios/*.js',
                },
                prod: {
                    script: 'env NODE_ENV=prod testcafe chrome tests/scenarios/*.js',
                },
            },
        },
        test: {
            local: {
                script: npsUtils.series.nps(
                    'checkDepsOnly',
                    'checkTypesOnly',
                    'common.test',
                    'tools.test',
                    'server.test',
                    'client.test',
                ),
            },
            remote: {
                dev: {
                    script: npsUtils.series.nps(
                        'deploy.dev',
                        'testOnly.remote.dev',
                    ),
                },
                prod: {
                    script: npsUtils.series.nps(
                        'deploy.prod',
                        'testOnly.remote.prod',
                    ),
                },
            },
        },
        deploy: {
            dev: {
                script: npsUtils.series.nps(
                    'server.deploy.dev',
                    'tools.deploy.dev',
                    'client.deploy.dev',
                ),
            },
            prod: {
                script: npsUtils.series.nps(
                    'server.deploy.prod',
                    'tools.deploy.prod',
                    'client.deploy.prod',
                ),
            },
        },
    },
};
