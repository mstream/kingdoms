const npsUtils = require(
    `nps-utils`,
);

const utils = require(
    `./utils`,
);

module.exports = {
    build: {
        dev: {
            script: npsUtils.series.nps(
                `server.test`,
                `server.cleanOnly`,
                `server.buildOnly.dev`,
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                `server.test`,
                `server.cleanOnly`,
                `server.buildOnly.prod`,
            ),
        },
    },
    buildOnly: {
        dev : `env TARGET=server NODE_ENV=dev webpack`,
        prod: `env TARGET=server NODE_ENV=prod webpack`,
    },
    cleanOnly                 : `rimraf server/.aws-sam && rimraf server/dist`,
    createOutputsDirectoryOnly: {
        dev: {
            script: `mkdir -p server/dist/dev`,
        },
        prod: {
            script: `mkdir -p server/dist/prod`,
        },
    },
    deploy: {
        dev: {
            script: npsUtils.series.nps(
                `server.build.dev`,
                `server.validateTemplateOnly.network`,
                `server.validateTemplateOnly.persistence`,
                `server.validateTemplateOnly.service`,
                `server.deployOnly.network.dev`,
                `server.deployOnly.persistence.dev`,
                `server.deployOnly.service.dev`,
                `server.saveOutputs.dev`,
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                `server.build.prod`,
                `server.validateTemplateOnly.network`,
                `server.validateTemplateOnly.persistence`,
                `server.validateTemplateOnly.service`,
                `server.deployOnly.network.prod`,
                `server.deployOnly.persistence.prod`,
                `server.deployOnly.service.prod`,
                `server.saveOutputs.prod`,
            ),
        },
    },
    deployOnly: {
        network: {
            dev: {
                script: utils.deployNetwork(
                    {
                        stackName   : `kingdoms-network`,
                        templateName: `network-template.yaml`,
                    },
                ),
            },
            prod: {
                script: utils.deployNetwork(
                    {
                        stackName   : `kingdoms-network`,
                        templateName: `network-template.yaml`,
                    },
                ),
            },
        },
        persistence: {
            dev: {
                script: utils.deployPersistence(
                    {
                        networkStackName: `kingdoms-network`,
                        stackName       : `kingdoms-persistence`,
                        templateName    : `persistence-template.yaml`,
                    },
                ),
            },
            prod: {
                script: utils.deployPersistence(
                    {
                        networkStackName: `kingdoms-network`,
                        stackName       : `kingdoms-persistence`,
                        templateName    : `persistence-template.yaml`,
                    },
                ),
            },
        },
        service: {
            dev: {
                script: utils.deployService(
                    {
                        environment         : `dev`,
                        loggingLevel        : `warn`,
                        networkStackName    : `kingdoms-network`,
                        persistenceStackName: `kingdoms-persistence`,
                        stackName           : `kingdoms-service`,
                        webContentTtl       : 60,
                    },
                ),
            },
            prod: {
                script: utils.deployService(
                    {
                        environment         : `prod`,
                        loggingLevel        : `warn`,
                        networkStackName    : `kingdoms-network`,
                        persistenceStackName: `kingdoms-persistence`,
                        stackName           : `kingdoms-service`,
                        webContentTtl       : 600,
                    },
                ),
            },
        },
    },
    destroy: {
        dev: {
            script: npsUtils.series.nps(
                `server.destroyOnly.service.dev`,
                `server.destroyOnly.persistence.dev`,
                `server.destroyOnly.network.dev`,
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                `server.destroyOnly.service.prod`,
                `server.destroyOnly.persistence.prod`,
                `server.destroyOnly.network.prod`,
            ),
        },
    },
    destroyOnly: {
        network: {
            dev: {
                script: utils.deleteStack(
                    {
                        stackName: `kingdoms-network`,
                    },
                ),
            },
            prod: {
                script: utils.deleteStack(
                    {
                        stackName: `kingdoms-network`,
                    },
                ),
            },
        },
        persistence: {
            dev: {
                script: utils.deleteStack(
                    {
                        stackName: `kingdoms-persistence`,
                    },
                ),
            },
            prod: {
                script: utils.deleteStack(
                    {
                        stackName: `kingdoms-persistence`,
                    },
                ),
            },
        },
        service: {
            dev: {
                script: utils.destroyService(
                    {
                        bucketName : `www.dev.kingdoms.maciej-laciak.com`,
                        environment: `dev`,
                        stackName  : `kingdoms-service`,
                    },
                ),
            },
            prod: {
                script: utils.destroyService(
                    {
                        bucketName : `www.prod.kingdoms.maciej-laciak.com`,
                        environment: `prod`,
                        stackName  : `kingdoms-service`,
                    },
                ),
            },
        },
    },
    saveOutputs: {
        dev: {
            script: npsUtils.series.nps(
                `server.createOutputsDirectoryOnly.dev`,
                `server.saveOutputsOnly.network.dev`,
                `server.saveOutputsOnly.persistence.dev`,
                `server.saveOutputsOnly.service.dev`,
            ),
        },
        prod: {
            script: npsUtils.series.nps(
                `server.createOutputsDirectoryOnly.prod`,
                `server.saveOutputsOnly.network.prod`,
                `server.saveOutputsOnly.persistence.prod`,
                `server.saveOutputsOnly.service.prod`,
            ),
        },
    },
    saveOutputsOnly: {
        network: {
            dev: {
                script: utils.saveOutputs(
                    {
                        environment   : `dev`,
                        outputFileName: `network`,
                        stackName     : `kingdoms-network`,
                        templateName  : `network`,
                    },
                ),
            },
            prod: {
                script: utils.saveOutputs(
                    {
                        environment   : `prod`,
                        outputFileName: `network`,
                        stackName     : `kingdoms-network`,
                        templateName  : `network`,
                    },
                ),
            },
        },
        persistence: {
            dev: {
                script: utils.saveOutputs(
                    {
                        environment   : `dev`,
                        outputFileName: `persistence`,
                        stackName     : `kingdoms-persistence`,
                    },
                ),
            },
            prod: {
                script: utils.saveOutputs(
                    {
                        environment   : `prod`,
                        outputFileName: `persistence`,
                        stackName     : `kingdoms-persistence`,
                    },
                ),
            },
        },
        service: {
            dev: {
                script: utils.saveOutputs(
                    {
                        environment   : `dev`,
                        outputFileName: `service`,
                        stackName     : `kingdoms-service-dev`,
                    },
                ),
            },
            prod: {
                script: utils.saveOutputs(
                    {
                        environment   : `prod`,
                        outputFileName: `service`,
                        stackName     : `kingdoms-service-prod`,
                    },
                ),
            },
        },
    },
    test: {
        script: npsUtils.series.nps(
            `checkCode`,
            `checkTypesOnly`,
            `server.testOnly`,
        ),
    },
    testOnly            : `jest --config server/jest.config.js server`,
    validateTemplateOnly: {
        network: {
            script: utils.validateTemplate(
                {
                    templateName: `network-template.yaml`,
                },
            ),
        },
        persistence: {
            script: utils.validateTemplate(
                {
                    templateName: `persistence-template.yaml`,
                },
            ),
        },
        service: {
            script: utils.validateTemplate(
                {
                    templateName: `template.yaml`,
                },
            ),
        },
    },
};
