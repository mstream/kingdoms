// $Flow

const npsUtils = require(`nps-utils`);

module.exports = {
    testOnly: `jest --config server/jest.config.js server`,
    cleanOnly: `rimraf server/.aws-sam`,
    buildOnly: {
        dev: `env TARGET=server NODE_ENV=dev webpack`,
        prod: `env TARGET=server NODE_ENV=prod webpack`,
    },
    validateTemplateOnly: {
        network: {
            script: `sam validate -t server/network-template.yaml`,
        },
        persistence: {
            script: `sam validate -t server/persistence-template.yaml`,
        },
        service: {
            script: `sam validate -t server/template.yaml`,
        },
    },
    saveOutputsOnly: {
        network: {
            dev: {
                script: `(echo 'module.exports = ' && aws cloudformation describe-stacks --stack-name kingdoms-network | jq '.Stacks | .[] | .Outputs | reduce .[] as $i ({}; .[$i.OutputKey] = $i.OutputValue)') > server/dist/dev/network.js`,
            },
            prod: {
                script: `(echo 'module.exports = ' && aws cloudformation describe-stacks --stack-name kingdoms-network | jq '.Stacks | .[] | .Outputs | reduce .[] as $i ({}; .[$i.OutputKey] = $i.OutputValue)') > server/dist/prod/network.js`,
            },
        },
        persistence: {
            dev: {
                script: `(echo 'module.exports = ' && aws cloudformation describe-stacks --stack-name kingdoms-persistence | jq '.Stacks | .[] | .Outputs | reduce .[] as $i ({}; .[$i.OutputKey] = $i.OutputValue)') > server/dist/dev/persistence.js`,
            },
            prod: {
                script: `(echo 'module.exports = ' && aws cloudformation describe-stacks --stack-name kingdoms-persistence | jq '.Stacks | .[] | .Outputs | reduce .[] as $i ({}; .[$i.OutputKey] = $i.OutputValue)') > server/dist/prod/persistence.js`,
            },
        },
        service: {
            dev: {
                script: `(echo 'module.exports = ' && aws cloudformation describe-stacks --stack-name kingdoms-service-dev | jq '.Stacks | .[] | .Outputs | reduce .[] as $i ({}; .[$i.OutputKey] = $i.OutputValue)') > server/dist/dev/service.js`,
            },
            prod: {
                script: `(echo 'module.exports = ' && aws cloudformation describe-stacks --stack-name kingdoms-service-prod | jq '.Stacks | .[] | .Outputs | reduce .[] as $i ({}; .[$i.OutputKey] = $i.OutputValue)') > server/dist/prod/service.js`,
            },
        },
    },
    deployOnly: {
        network: {
            dev: {
                script: `sam deploy --no-fail-on-empty-changeset -t server/network-template.yaml --stack-name kingdoms-network --s3-prefix kingdoms-network`,
            },
            prod: {
                script: `sam deploy --no-fail-on-empty-changeset -t server/network-template.yaml --stack-name kingdoms-network --s3-prefix kingdoms-network`,
            },
        },
        persistence: {
            dev: {
                script: `sam deploy --no-fail-on-empty-changeset -t server/persistence-template.yaml --stack-name kingdoms-persistence --s3-prefix kingdoms-persistence --parameter-overrides NetworkStackName=kingdoms-network`,
            },
            prod: {
                script: `sam deploy --no-fail-on-empty-changeset -t server/persistence-template.yaml --stack-name kingdoms-persistence --s3-prefix kingdoms-persistence --parameter-overrides NetworkStackName=kingdoms-network`,
            },
        },
        service: {
            dev: {
                script: `cd server && sam deploy --no-fail-on-empty-changeset --stack-name kingdoms-service-dev --s3-prefix kingdoms-service-dev --parameter-overrides NetworkStackName=kingdoms-network PersistenceStackName=kingdoms-persistence Environment=dev WebContentTtl=60`,
            },
            prod: {
                script: `cd server && sam deploy --no-fail-on-empty-changeset --stack-name kingdoms-service-prod --s3-prefix kingdoms-service-prod --parameter-overrides NetworkStackName=kingdoms-network PersistenceStackName=kingdoms-persistence Environment=prod WebContentTtl=600`,
            },
        },
    },
    destroyOnly: {
        network: {
            dev: {
                script: `aws cloudformation delete-stack --stack-name kingdoms-network`,
            },
            prod: {
                script: `aws cloudformation delete-stack --stack-name kingdoms-network`,
            },
        },
        persistence: {
            dev: {
                script: `aws cloudformation delete-stack --stack-name kingdoms-persistence`,
            },
            prod: {
                script: `aws cloudformation delete-stack --stack-name kingdoms-persistence`,
            },
        },
        service: {
            dev: {
                script: `aws s3 rm --recursive s3://www.dev.kingdoms.maciej-laciak.com/ && aws cloudformation delete-stack --stack-name kingdoms-service-dev`,
            },
            prod: {
                script: `aws s3 rm --recursive s3://www.prod.kingdoms.maciej-laciak.com/ && aws cloudformation delete-stack --stack-name kingdoms-service-prod`,
            },
        },
    },
    createOutputsDirectoryOnly: {
        dev: {
            script: `mkdir -p server/dist/dev`,
        },
        prod: {
            script: `mkdir -p server/dist/prod`,
        },
    },
    test: {
        script: npsUtils.series.nps(
            `server.testOnly`,
        ),
    },
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
};
