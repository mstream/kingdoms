const deleteStack = (
    {
        stackName,
    },
) => {

    return `aws cloudformation delete-stack --stack-name ${ stackName }`;

};

const validateTemplate = (
    {
        templateName,
    },
) => {

    return `cd server && sam validate -t ${ templateName }`;

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
        networkStackName,
        stackName,
        templateName,
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
        bucketName,
        environment,
        stackName,
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
    deleteStack,
    deployNetwork,
    deployPersistence,
    deployService,
    destroyService,
    saveOutputs,
    validateTemplate,
};
