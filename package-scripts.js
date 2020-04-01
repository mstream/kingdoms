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
        test: {
            script: npsUtils.series.nps(
                'checkDepsOnly',
                'checkTypesOnly',
                'common.test',
                'tools.test',
                'server.test',
                'client.test',
            ),
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
