// @flow

jest.mock(
    '../../config',
    () => {
        return {
            config: {
                environment: 'env1',
                redis: {
                    host: 'redis',
                    port: 1234,
                },
            },
        };
    },
);

jest.mock(
    '../../clients/redis',
    () => {
        return {
            createRedisClient: () => {
                return {
                    sadd: () => Promise.resolve(1),
                };
            },
        };
    },
);

import type { APIGatewayProxyEvent, Context } from '../types';
import { handler } from './app';

describe('onConnectHandler', () => {
    it('', async () => {
        const context: Context = {
            callbackWaitsForEmptyEventLoop: false,
            functionName: '',
            functionVersion: '',
            invokedFunctionArn: '',
            memoryLimitInMB: '',
            awsRequestId: '',
            logGroupName: '',
            logStreamName: '',
            identity: {
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
            },
            clientContext: {
                client: {
                    installationId: '',
                    appTitle: '',
                    appVersionName: '',
                    appVersionCode: '',
                    appPackageName: '',
                },
                Custom: undefined,
                env: {
                    platformVersion: '',
                    platform: '',
                    make: '',
                    model: '',
                    locale: '',
                },
            },
            getRemainingTimeInMillis: () => 0,
            done: () => undefined,
            fail: () => undefined,
            succeed: () => undefined,
        };

        const callback = () => undefined;

        const event: APIGatewayProxyEvent = {
            body: null,
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '/',
            pathParameters: {},
            queryStringParameters: {},
            multiValueQueryStringParameters: {},
            stageVariables: {},
            requestContext: {
                accountId: '',
                apiId: '',
                authorizer: {},
                connectedAt: 0,
                connectionId: 'connection1',
                domainName: '',
                domainPrefix: '',
                eventType: '',
                extendedRequestId: '',
                protocol: '',
                httpMethod: '',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                messageDirection: '',
                messageId: '',
                path: '',
                stage: '',
                requestId: '',
                requestTime: '',
                requestTimeEpoch: 0,
                resourceId: '',
                resourcePath: '',
                routeKey: '',
            },
            resource: '',
        };

        const expected = {
            statusCode: 200,
            body: `Connected.`,
        };

        const actual = await handler(event, context, callback);


        expect(actual).toEqual(expected);
    });
});
