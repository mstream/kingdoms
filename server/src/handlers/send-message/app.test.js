// @flow

import {
    emptyApiGatewayProxyEvent, emptyContext,
} from '../util';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    getCurrentState,
} from '../../../../common/src/state/actions';
import {
    handler,
} from './app';
import {
    mockGet, mockSadd, mockSet,
} from '../../clients/redis';
import {
    mockPostToConnection,
} from '../../clients/api-gateway';
import {
    serializeJson,
} from '../../../../common/src/json';
import {
    stubConfig,
} from '../../config';
import type {
    APIGatewayProxyEvent, Context,
} from '../types';
import type {
    ServerRequest,
} from '../../../../common/src/types';

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/redis`,
);

jest.mock(
    `../../clients/api-gateway`,
);

describe(
    `sendMessageHandler`,
    () => {

        it(
            `get state request`,
            async () => {

                const context: Context = {
                    ...emptyContext,
                };

                const callback = () => {

                    return undefined;

                };

                const state = {
                    ...emptyCommonState,
                };

                const serverRequest: ServerRequest = {
                    action: getCurrentState(
                        {
                            playerId: `player1`,
                        },
                    ),
                    worldId: `world1`,
                };

                const event: APIGatewayProxyEvent = {
                    ...emptyApiGatewayProxyEvent,
                    body: serializeJson(
                        {
                            json: {
                                data: serverRequest,
                            },
                        },
                    ),
                    requestContext: {
                        ...emptyApiGatewayProxyEvent.requestContext,
                        authorizer: {
                            principalId: `player1`,
                        },
                        connectionId: `connection1`,
                    },
                };

                mockSet.mockImplementation(
                    () => {

                        return Promise.resolve(
                            `OK`,
                        );

                    },
                );

                mockSadd.mockImplementation(
                    () => {

                        return Promise.resolve(
                            1,
                        );

                    },
                );

                mockGet.mockImplementation(
                    () => {

                        return Promise.resolve(
                            serializeJson(
                                {
                                    json: state,
                                },
                            ),
                        );

                    },
                );

                mockPostToConnection.mockImplementation(
                    () => {

                        return {
                            promise: () => {

                                return Promise.resolve();

                            },
                        };

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
                    mockSet.mock.calls.sort(),
                )
                    .toEqual(
                        [
                            [
                                `connection-by-player`
                                + `:${ stubConfig.environment }:player1`,
                                `connection1`,
                            ],
                            [
                                `world-by-player`
                                + `:${ stubConfig.environment }:player1`,
                                `world1`,
                            ],
                        ].sort(),
                    );

                expect(
                    mockSadd.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `players-by-world:${ stubConfig.environment }:world1`,
                                `player1`,
                            ],
                        ],
                    );

                expect(
                    mockGet.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `state-by-world`
                                + `:${ stubConfig.environment }:world1`,
                            ],
                        ],
                    );

                expect(
                    mockPostToConnection.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                {
                                    ConnectionId: `connection1`,
                                    Data        : serializeJson(
                                        {
                                            json: {
                                                errors : [],
                                                request: serverRequest,
                                                state,
                                            },
                                        },
                                    ),
                                },
                            ],
                        ],
                    );

            },
        );

    },
);
