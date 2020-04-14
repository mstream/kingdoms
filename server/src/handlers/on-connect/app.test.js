// @flow

import {
    emptyApiGatewayProxyEvent, emptyContext,
} from '../util';
import type {
    APIGatewayProxyEvent, Context,
} from '../types';
import {
    handler,
} from './app';

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/redis`,
);

describe(
    `onConnectHandler`,
    () => {

        it(
            ``,
            async () => {

                const context: Context = {
                    ...emptyContext,
                };

                const callback = () => {

                    return undefined;

                };

                const event: APIGatewayProxyEvent = {
                    ...emptyApiGatewayProxyEvent,
                    requestContext: {
                        ...emptyApiGatewayProxyEvent.requestContext,
                        connectionId: `connection1`,
                    },
                };

                const expected = {
                    body      : `Connected.`,
                    statusCode: 200,
                };

                const actual = await handler(
                    event,
                    context,
                    callback,
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

    },
);
