// @flow

jest.mock('../../config', () => {
    return {
        config: {},
    };
});

jest.mock('../../clients/cognito', () => {
    return {
        createCognitoClient: () => {
            return {
                getJwks: () =>
                    Promise.resolve([
                        {
                            alg: '',
                            e: '',
                            kid: 'key1',
                            kty: '',
                            n: 'publicKey1',
                            use: '',
                        },
                        {
                            alg: '',
                            e: '',
                            kid: 'key2',
                            kty: '',
                            n: 'publicKey2',
                            use: '',
                        },
                    ]),
            };
        },
    };
});

jest.mock('../../jwt', () => {
    return {
        buildUserProfile: () =>
            Promise.resolve({
                errors: [],
                userProfile: {
                    name: 'user1',
                },
            }),
    };
});

import { emptyContext, emptyCustomAuthorizerEvent } from '../util';
import type { Context, CustomAuthorizerEvent } from '../types';
import { handler } from './app';

describe('authenticateHandler', () => {
    it('', async () => {
        const context: Context = {
            ...emptyContext,
        };

        const callback = () => undefined;

        const event: CustomAuthorizerEvent = {
            ...emptyCustomAuthorizerEvent,
            queryStringParameters: {
                token: 'token',
            },
            methodArn: 'methodArn',
        };

        const expected = {
            principalId: `user1`,
            policyDocument: {
                Version: `2012-10-17`,
                Statement: [
                    {
                        Action: `execute-api:Invoke`,
                        Effect: `Allow`,
                        Resource: 'methodArn',
                    },
                ],
            },
        };

        const actual = await handler(event, context, callback);

        expect(actual).toEqual(expected);
    });
});
