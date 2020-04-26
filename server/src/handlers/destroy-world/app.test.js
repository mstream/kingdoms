// @flow

import {
    emptyApiGatewayProxyEvent, emptyContext,
} from '../util';
import {
    handler,
} from './app';
import {
    mockDel, mockSrem,
} from '../../clients/redis';
import {
    serializeJson,
} from '../../../../common/src/json';
import {
    stubConfig,
} from '../../config';
import type {
    APIGatewayProxyEvent, Context,
} from '../types';

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/redis`,
);

describe(
    `destroyWorldHandler`,
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

                const worldId = `world1`;

                const event: APIGatewayProxyEvent = {
                    ...emptyApiGatewayProxyEvent,
                    body: serializeJson(
                        {
                            json: {
                                worldId,
                            },
                        },
                    ),
                };

                mockSrem.mockImplementation(
                    () => {

                        return Promise.resolve(
                            1,
                        );

                    },
                );

                mockDel.mockImplementation(
                    () => {

                        return Promise.resolve(
                            1,
                        );

                    },
                );

                const expected = {
                    body      : `Request accepted.`,
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

                expect(
                    mockSrem.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `worlds:${ stubConfig.environment }`,
                                `world1`,
                            ],
                        ],
                    );

                expect(
                    mockDel.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `state-by-world:${ stubConfig.environment }:world1`,
                            ],
                        ],
                    );

            },
        );

    },
);
