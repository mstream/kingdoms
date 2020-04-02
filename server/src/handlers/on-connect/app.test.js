// @flow

jest.mock('../../config', () => {
    return {
        config: {
            environment: 'env1',
            redis: {
                host: 'redis',
                port: 1234,
            },
        },
    };
});

jest.mock('../../clients/redis', () => {
    return {
        createRedisClient: () => {
            return {
                sadd: () => Promise.resolve(1),
            };
        },
    };
});

import { emptyApiGatewayProxyEvent, emptyContext } from '../util';
import type { APIGatewayProxyEvent, Context } from '../types';
import { handler } from './app';

describe('onConnectHandler', () => {
    it('', async () => {
        const context: Context = {
            ...emptyContext,
        };

        const callback = () => undefined;

        const event: APIGatewayProxyEvent = {
            ...emptyApiGatewayProxyEvent,
            requestContext: {
                ...emptyApiGatewayProxyEvent.requestContext,
                connectionId: 'connection1',
            },
        };

        const expected = {
            statusCode: 200,
            body: `Connected.`,
        };

        const actual = await handler(event, context, callback);

        expect(actual).toEqual(expected);
    });
});
