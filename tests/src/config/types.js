// @flow

export type Config = $ReadOnly< {|
    appUrl: string,
    clientId: string,
    cognitoUrl: string,
    loggingLevel: string,
    region: string,
    resetStateFunctionName: string,
    userPoolId: string,
    webSocketUrl: string,
|} >;
