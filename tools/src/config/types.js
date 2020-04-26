// @flow

export type Config = $ReadOnly< {
    clientId: string,
    destroyWorldFunctionName: string,
    region: string,
    resetStateFunctionName: string,
    userPoolId: string,
} >;
