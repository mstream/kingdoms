// @flow

import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    emptyContext, emptySqsEvent, emptySqsRecord,
} from '../util';
import {
    executeTimeStep,
} from '../../../../common/src/state/modules/_children/cities/actions';
import {
    expectCalls,
} from '../../../../common/src/test-utils';
import {
    handler,
} from './app';
import {
    mockGet,  mockSmembers,
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
    Context, SqsEvent,
} from '../types';

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/api-gateway`,
);


jest.mock(
    `../../clients/redis`,
);

describe(
    `broadcastStateHandler`,
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

                const state1 = {
                    ...emptyCommonState,
                };

                const state2 = {
                    ...emptyCommonState,
                };

                const updateMessagePayload1 = serializeJson(
                    {
                        json: {
                            state  : state1,
                            time   : `2000-01-01T01:00:00.000Z`,
                            worldId: `world1`,
                        },
                    },
                );

                const updateMessagePayload2 = serializeJson(
                    {
                        json: {
                            state  : state2,
                            time   : `2000-01-01T02:00:00.000Z`,
                            worldId: `world2`,
                        },
                    },
                );

                const event: SqsEvent = {
                    ...emptySqsEvent,
                    Records: [
                        {
                            ...emptySqsRecord,
                            body: updateMessagePayload1,
                        },
                        {
                            ...emptySqsRecord,
                            body: updateMessagePayload2,
                        },
                    ],
                };

                mockGet.mockImplementation(
                    (
                        key,
                    ) => {

                        if ( key.includes(
                            `player1`,
                        ) ) {

                            return Promise.resolve(
                                `connection1`,
                            );

                        }

                        if ( key.includes(
                            `player2`,
                        ) ) {

                            return Promise.resolve(
                                `connection2`,
                            );

                        }

                        if ( key.includes(
                            `player3`,
                        ) ) {

                            return Promise.resolve(
                                `connection3`,
                            );

                        }

                        if ( key.includes(
                            `player4`,
                        ) ) {

                            return Promise.resolve(
                                `connection4`,
                            );

                        }

                        return Promise.reject(
                            `mockGet: ${ key }`,
                        );

                    },
                );

                mockSmembers.mockImplementation(
                    (
                        key: string,
                    ) => {

                        if ( key.includes(
                            `world1`,
                        ) ) {

                            return Promise.resolve(
                                [
                                    `player1`,
                                    `player2`,
                                ],
                            );

                        }

                        if ( key.includes(
                            `world2`,
                        ) ) {

                            return Promise.resolve(
                                [
                                    `player3`,
                                    `player4`,
                                ],
                            );

                        }

                        return Promise.reject(
                            `mockSmembers: ${ key }`,
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

                await handler(
                    event,
                    context,
                    callback,
                );

                expectCalls(
                    {
                        calls: [
                            [
                                `connection-by-player:${ stubConfig.environment }:player1`,
                            ],
                            [
                                `connection-by-player:${ stubConfig.environment }:player2`,
                            ],
                            [
                                `connection-by-player:${ stubConfig.environment }:player3`,
                            ],
                            [
                                `connection-by-player:${ stubConfig.environment }:player4`,
                            ],
                        ],
                        expect,
                        mockFunction: mockGet,
                    },
                );

                expectCalls(
                    {
                        calls: [
                            [
                                `players-by-world:${ stubConfig.environment }:world1`,
                            ],
                            [
                                `players-by-world:${ stubConfig.environment }:world2`,
                            ],
                        ],
                        expect,
                        mockFunction: mockSmembers,
                    },
                );

                expectCalls(
                    {
                        calls: [
                            [
                                {
                                    ConnectionId: `connection1`,
                                    Data        : serializeJson(
                                        {
                                            json: {
                                                errors : [],
                                                request: {
                                                    action: executeTimeStep(
                                                        {
                                                            time: `2000-01-01T01:00:00.000Z`,
                                                        },
                                                    ),
                                                    worldId: `world1`,
                                                },
                                                state: state1,
                                            },
                                        },
                                    ),
                                },
                            ],
                            [
                                {
                                    ConnectionId: `connection2`,
                                    Data        : serializeJson(
                                        {
                                            json: {
                                                errors : [],
                                                request: {
                                                    action: executeTimeStep(
                                                        {
                                                            time: `2000-01-01T01:00:00.000Z`,
                                                        },
                                                    ),
                                                    worldId: `world1`,
                                                },
                                                state: state1,
                                            },
                                        },
                                    ),
                                },
                            ],
                            [
                                {
                                    ConnectionId: `connection3`,
                                    Data        : serializeJson(
                                        {
                                            json: {
                                                errors : [],
                                                request: {
                                                    action: executeTimeStep(
                                                        {
                                                            time: `2000-01-01T02:00:00.000Z`,
                                                        },
                                                    ),
                                                    worldId: `world2`,
                                                },
                                                state: state2,
                                            },
                                        },
                                    ),
                                },
                            ],
                            [
                                {
                                    ConnectionId: `connection4`,
                                    Data        : serializeJson(
                                        {
                                            json: {
                                                errors : [],
                                                request: {
                                                    action: executeTimeStep(
                                                        {
                                                            time: `2000-01-01T02:00:00.000Z`,
                                                        },
                                                    ),
                                                    worldId: `world2`,
                                                },
                                                state: state2,
                                            },
                                        },
                                    ),
                                },
                            ],
                        ],
                        expect,
                        mockFunction: mockPostToConnection,
                    },
                );

            },
        );

    },
);

