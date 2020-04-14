// @flow

import type {
    APIGatewayEventRequestContext,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
    CustomAuthorizerEvent,
    ScheduledEvent,
} from './types';

const emptyApiGatewayEventRequestContext: APIGatewayEventRequestContext = {
    accountId        : ``,
    apiId            : ``,
    authorizer: {
    },
    connectedAt      : 0,
    connectionId     : ``,
    domainName       : ``,
    domainPrefix     : ``,
    eventType        : ``,
    extendedRequestId: ``,
    httpMethod       : ``,
    identity         : {
        accessKey                    : null,
        accountId                    : null,
        apiKey                       : null,
        apiKeyId                     : null,
        caller                       : null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType    : null,
        cognitoIdentityId            : null,
        cognitoIdentityPoolId        : null,
        principalOrgId               : null,
        sourceIp                     : ``,
        user                         : null,
        userAgent                    : null,
        userArn                      : null,
    },
    messageDirection: ``,
    messageId       : ``,
    path            : ``,
    protocol        : ``,
    requestId       : ``,
    requestTime     : ``,
    requestTimeEpoch: 0,
    resourceId      : ``,
    resourcePath    : ``,
    routeKey        : ``,
    stage           : ``,
};

export const emptyApiGatewayProxyEvent: APIGatewayProxyEvent = {
    body                           : null,
    headers: {
    },
    httpMethod                     : ``,
    isBase64Encoded                : false,
    multiValueHeaders: {
    },
    multiValueQueryStringParameters: {
    },
    path                           : ``,
    pathParameters: {
    },
    queryStringParameters: {
    },
    requestContext: emptyApiGatewayEventRequestContext,
    resource                       : ``,
    stageVariables: {
    },
};

export const emptyCustomAuthorizerEvent: CustomAuthorizerEvent = {
    apiId                          : ``,
    authorizationToken: ``,
    domainName                     : ``,
    headers                        : {
    },
    httpMethod                     : ``,
    methodArn                      : ``,
    multiValueHeaders: {
    },
    multiValueQueryStringParameters: {
    },
    path                           : ``,
    pathParameters: {
    },
    queryStringParameters: {
        type: ``,
    },
    requestContext: {
        ...emptyApiGatewayEventRequestContext,
    },
    resource      : ``,
    stageVariables: {
    },
    type: ``,
};

export const emptyScheduledEvent: ScheduledEvent = {
    'account': ``,
    'detail'     : {
    },
    'detail-type': ``,
    'id'         : ``,
    'region'     : ``,
    'resources'  : [],
    'source'     : ``,
    'time'       : ``,
};

export const emptyContext: Context = {
    awsRequestId                  : ``,
    callbackWaitsForEmptyEventLoop: false,
    clientContext                 : {
        Custom: undefined,
        client: {
            appPackageName: ``,
            appTitle      : ``,
            appVersionCode: ``,
            appVersionName: ``,
            installationId: ``,
        },
        env: {
            locale         : ``,
            make           : ``,
            model          : ``,
            platform       : ``,
            platformVersion: ``,
        },
    },
    done: () => {

        return undefined;

    },
    fail: () => {

        return undefined;

    },
    functionName            : ``,
    functionVersion         : ``,
    getRemainingTimeInMillis: () => {

        return 0;

    },
    identity: {
        cognitoIdentityId    : ``,
        cognitoIdentityPoolId: ``,
    },
    invokedFunctionArn: ``,
    logGroupName      : ``,
    logStreamName     : ``,
    memoryLimitInMB   : ``,
    succeed           : () => {

        return undefined;

    },
};

export const generateRequestAcceptedResponse = (): APIGatewayProxyResult => {

    return {
        body      : `Request accepted.`,
        statusCode: 200,
    };

};

export const generateRequestRejectionResponse = (
    {
        reason,
    }: $ReadOnly< {| reason: string |} >,
): APIGatewayProxyResult => {

    return {
        body      : `Request rejected: ${ reason }`,
        statusCode: 400,
    };

};

export const generateRequestExecutionErrorResponse = (
    {
        reason,
    }: $ReadOnly< {| reason: string |} >,
): APIGatewayProxyResult => {

    return {
        body      : `Request processing error: ${ reason }`,
        statusCode: 500,
    };

};
