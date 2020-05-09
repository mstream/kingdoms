// @flow

export type Config = $ReadOnly< {|
    appUrl: string,
    clientId: string,
    cognitoUrl: string,
    destroyWorldFunctionName: string,
    loggingLevel: string,
    region: string,
    resetStateFunctionName: string,
    userPoolId: string,
    version: string,
    webSocketUrl: string,
|} >;
