// @flow

export type Config = $ReadOnly< {
    clientId: string,
    region: string,
    resetStateFunctionName: string,
    userPoolId: string,
} >;
