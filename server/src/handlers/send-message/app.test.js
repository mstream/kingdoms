// @flow

import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    mockGet, mockSadd, mockSet,
} from '../../clients/redis';
import {
    emptyApiGatewayProxyEvent, emptyContext,
} from '../util';
import type {
    APIGatewayProxyEvent, Context,
} from '../types';
import {
    handler,
} from './app';
import {
    stubConfig,
} from '../../config';
import {
    getCurrentState,
} from '../../../../common/src/state/actions';
import {
    mockPostToConnection,
} from '../../clients/api-gateway';
import type {
    ServerRequest,
} from '../../../../common/src/types';
import {
    stringifyJson,
} from '../../../../common/src/json';

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
                    body: stringifyJson(
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
                            stringifyJson(
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
                                `connection-by-player:${ stubConfig.environment }:player1`,
                                `connection1`,
                            ],
                            [
                                `world-by-player:${ stubConfig.environment }:player1`,
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
                                `state-by-world:${ stubConfig.environment }:world1`,
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
                                    Data        : stringifyJson(
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