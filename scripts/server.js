const npsUtils = require(
    `nps-utils`,
);

const deleteStack = (
    {
        stackName,
    },
) => {

    return `aws cloudformation delete-stack `
        + `--stack-name ${ stackName }`;

};

const validateTemplate = (
    {
        templateName,
    },
) => {

    return `cd server && `
        + `sam validate `
        + `-t ${ templateName }`;

};

const deployNetwork = (
    {
        stackName, templateName,
    },
) => {

    return `cd server && `
        + `sam deploy `
        + `--no-fail-on-empty-changeset `
        + `-t ${ templateName } `
        + `--stack-name ${ stackName } `
        + `--s3-prefix ${ stackName }`;

};

const deployPersistence = (
    {
        networkStackName, stackName, templateName,
    },
) => {

    return `cd server && `
        + `sam deploy `
        + `--no-fail-on-empty-changeset `
        + `-t ${ templateName } `
        + `--stack-name ${ stackName } `
        + `--s3-prefix ${ stackName } `
        + `--parameter-overrides `
        + `NetworkStackName=${ networkStackName }`;

};

const deployService = (
    {
        environment,
        loggingLevel,
        networkStackName,
        persistenceStackName,
        stackName,
        webContentTtl,
    },
) => {

    return `cd server && `
        + `sam deploy `
        + `--no-fail-on-empty-changeset `
        + `--stack-name ${ stackName }-${ environment } `
        + `--s3-prefix ${ stackName } `
        + `--parameter-overrides `
        + `NetworkStackName=${ networkStackName } `
        + `PersistenceStackName=${ persistenceStackName } `
        + `Environment=${ environment } `
        + `LoggingLevel=${ loggingLevel } `
        + `WebContentTtl=${ webContentTtl }`;

};

const destroyService = (
    {
        bucketName, environment, stackName,
    },
) => {

    return `(aws s3 rm --recursive s3://${ bucketName } || true) && `
        + `aws cloudformation delete-stack`
        + ` --stack-name ${ stackName }-${ environment }`;

};

const saveOutputs = (
    {
        environment,
        outputFileName,
        stackName,
    },
) => {

    return `(`
        + `echo 'module.exports = ' && `
        + `aws cloudformation describe-stacks `
        + `--stack-name ${ stackName } | `
        + `jq '.Stacks | `
        + `.[] | `
        + `.Outputs | `
        + `reduce .[] as $i ({}; .[$i.OutputKey] = $i.OutputValue)'`
        + `) > server/dist/${ environment }/${ outputFileName }.js`;

};

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
    cleanOnly                 : `rimraf server/.aws-sam`,
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
                script: deployNetwork(
                    {
                        stackName   : `kingdoms-network`,
                        templateName: `network-template.yaml`,
                    },
                ),
            },
            prod: {
                script: deployNetwork(
                    {
                        stackName   : `kingdoms-network`,
                        templateName: `network-template.yaml`,
                    },
                ),
            },
        },
        persistence: {
            dev: {
                script: deployPersistence(
                    {
                        networkStackName: `kingdoms-network`,
                        stackName       : `kingdoms-persistence`,
                        templateName    : `persistence-template.yaml`,
                    },
                ),
            },
            prod: {
                script: deployPersistence(
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
                script: deployService(
                    {
                        environment         : `dev`,
                        loggingLevel        : `debug`,
                        networkStackName    : `kingdoms-network`,
                        persistenceStackName: `kingdoms-persistence`,
                        stackName           : `kingdoms-service`,
                        webContentTtl       : 60,
                    },
                ),
            },
            prod: {
                script: deployService(
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
                script: deleteStack(
                    {
                        stackName: `kingdoms-network`,
                    },
                ),
            },
            prod: {
                script: deleteStack(
                    {
                        stackName: `kingdoms-network`,
                    },
                ),
            },
        },
        persistence: {
            dev: {
                script: deleteStack(
                    {
                        stackName: `kingdoms-persistence`,
                    },
                ),
            },
            prod: {
                script: deleteStack(
                    {
                        stackName: `kingdoms-persistence`,
                    },
                ),
            },
        },
        service: {
            dev: {
                script: destroyService(
                    {
                        bucketName : `www.dev.kingdoms.maciej-laciak.com`,
                        environment: `dev`,
                        stackName  : `kingdoms-service`,
                    },
                ),
            },
            prod: {
                script: destroyService(
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
                script: saveOutputs(
                    {
                        environment : `dev`,
                        stackName   : `kingdoms-network`,
                        templateName: `network`,
                    },
                ),
            },
            prod: {
                script: saveOutputs(
                    {
                        environment : `prod`,
                        stackName   : `kingdoms-network`,
                        templateName: `network`,
                    },
                ),
            },
        },
        persistence: {
            dev: {
                script: saveOutputs(
                    {
                        environment   : `dev`,
                        outputFileName: `persistence`,
                        stackName     : `kingdoms-persistence`,
                    },
                ),
            },
            prod: {
                script: saveOutputs(
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
                script: saveOutputs(
                    {
                        environment   : `dev`,
                        outputFileName: `service`,
                        stackName     : `kingdoms-service-dev`,
                    },
                ),
            },
            prod: {
                script: saveOutputs(
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
            script: validateTemplate(
                {
                    templateName: `network-template.yaml`,
                },
            ),
        },
        persistence: {
            script: validateTemplate(
                {
                    templateName: `persistence-template.yaml`,
                },
            ),
        },
        service: {
            script: validateTemplate(
                {
                    templateName: `template.yaml`,
                },
            ),
        },
    },
};
