// @flow

import { emptyContext, emptyCustomAuthorizerEvent } from '../util';
import type { Context, CustomAuthorizerEvent } from '../types';
import { handler } from './app';

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
            principalId: `user`,
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
