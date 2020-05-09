// @flow

export type Config = $ReadOnly< {|
    clientId: string,
    cognitoUrl: string,
    httpApiUrl: string,
    loggingLevel: string,
    version: string,
    webSocketApiUrl: string,
|} >;
