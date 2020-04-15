// @flow

import {
    dummyMultiRedis,
} from '../../clients/redis/utils';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    emptyContext, emptyScheduledEvent,
} from '../util';
import {
    executeTimeStep,
} from '../../../../common/src/state/modules/cities/actions';
import {
    expectCalls,
} from '../../../../common/src/test-utils';
import {
    handler,
} from './app';
import {
    mockGet,
    mockMulti,
    mockSmembers,
    mockUnwatch,
    mockWatch,
} from '../../clients/redis';
import {
    mockGetCurrent,
} from '../../clients/date-provider';
import {
    mockPostToConnection,
} from '../../clients/api-gateway';
import {
    stringifyJson,
} from '../../../../common/src/json';
import {
    stubConfig,
} from '../../config';
import type {
    CommonState,
} from '../../../../common/src/state/modules/types';
import type {
    Context, ScheduledEvent,
} from '../types';

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/api-gateway`,
);

jest.mock(
    `../../clients/date-provider`,
);

jest.mock(
    `../../clients/redis`,
);

describe(
    `updateStateHandler`,
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

                const event: ScheduledEvent = {
                    ...emptyScheduledEvent,
                };

                mockWatch.mockImplementation(
                    () => {

                        return Promise.resolve(
                            `OK`,
                        );

                    },
                );

                mockUnwatch.mockImplementation(
                    () => {

                        return Promise.resolve(
                            `OK`,
                        );

                    },
                );

                mockGet.mockImplementation(
                    (
                        key,
                    ) => {

                        if ( key.startsWith(
                            `state-by-world`,
                        ) ) {

                            if ( key.includes(
                                `world1`,
                            ) ) {

                                return Promise.resolve(
                                    stringifyJson(
                                        {
                                            json: state1,
                                        },
                                    ),
                                );

                            }

                            if ( key.includes(
                                `world2`,
                            ) ) {

                                return Promise.resolve(
                                    stringifyJson(
                                        {
                                            json: state2,
                                        },
                                    ),
                                );

                            }

                        }

                        if ( key.startsWith(
                            `connection-by-player`,
                        ) ) {

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

                        if ( key.startsWith(
                            `worlds`,
                        ) ) {

                            return Promise.resolve(
                                [
                                    `world1`,
                                    `world2`,
                                ],
                            );

                        }

                        if ( key.startsWith(
                            `players-by-world`,
                        ) ) {

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

                        }

                        return Promise.reject(
                            `mockSmembers: ${ key }`,
                        );

                    },
                );

                const mockMultiExec = jest.fn(
                    () => {

                        return Promise.resolve(
                            [
                                `OK`,
                            ],
                        );

                    },
                );

                const mockMultiSet = jest.fn(
                    () => {

                        return {
                            ...dummyMultiRedis,
                            exec: mockMultiExec,
                        };

                    },
                );

                mockMulti.mockImplementation(
                    () => {

                        return {
                            ...dummyMultiRedis,
                            set: mockMultiSet,
                        };

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

                mockGetCurrent.mockImplementation(
                    () => {

                        return new Date(
                            `2000-01-01T01:00:00.000Z`,
                        );

                    },
                );

                const updatedState1: CommonState = {
                    ...state1,
                    time: `2000-01-01T01:00:00.000Z`,
                };

                const updatedState2: CommonState = {
                    ...state2,
                    time: `2000-01-01T01:00:00.000Z`,
                };

                await handler(
                    event,
                    context,
                    callback,
                );

                expectCalls(
                    {
                        calls: [
                            [
                                `state-by-world:${ stubConfig.environment }:world1`,
                            ],
                            [
                                `state-by-world:${ stubConfig.environment }:world2`,
                            ],
                        ],
                        expect,
                        mockFunction: mockWatch,
                    },
                );

                expectCalls(
                    {
                        calls: [
                            [
                                `state-by-world:${ stubConfig.environment }:world1`,
                            ],
                            [
                                `state-by-world:${ stubConfig.environment }:world2`,
                            ],
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
                            [],
                            [],
                        ],
                        expect,
                        mockFunction: mockMulti,
                    },
                );

                expectCalls(
                    {
                        calls: [
                            [
                                `state-by-world:${ stubConfig.environment }:world1`,
                                stringifyJson(
                                    {
                                        json: updatedState1,
                                    },
                                ),
                            ],
                            [
                                `state-by-world:${ stubConfig.environment }:world2`,
                                stringifyJson(
                                    {
                                        json: updatedState2,
                                    },
                                ),
                            ],
                        ],
                        expect,
                        mockFunction: mockMultiSet,
                    },
                );

                expectCalls(
                    {
                        calls: [
                            [],
                            [],
                        ],
                        expect,
                        mockFunction: mockMultiExec,
                    },
                );

                expectCalls(
                    {
                        calls: [
                            [
                                `worlds:${ stubConfig.environment }`,
                            ],
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
                                    Data        : stringifyJson(
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
                                                state: updatedState1,
                                            },
                                        },
                                    ),
                                },
                            ],
                            [
                                {
                                    ConnectionId: `connection2`,
                                    Data        : stringifyJson(
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
                                                state: updatedState1,
                                            },
                                        },
                                    ),
                                },
                            ],
                            [
                                {
                                    ConnectionId: `connection3`,
                                    Data        : stringifyJson(
                                        {
                                            json: {
                                                errors : [],
                                                request: {
                                                    action: executeTimeStep(
                                                        {
                                                            time: `2000-01-01T01:00:00.000Z`,
                                                        },
                                                    ),
                                                    worldId: `world2`,
                                                },
                                                state: updatedState2,
                                            },
                                        },
                                    ),
                                },
                            ],
                            [
                                {
                                    ConnectionId: `connection4`,
                                    Data        : stringifyJson(
                                        {
                                            json: {
                                                errors : [],
                                                request: {
                                                    action: executeTimeStep(
                                                        {
                                                            time: `2000-01-01T01:00:00.000Z`,
                                                        },
                                                    ),
                                                    worldId: `world2`,
                                                },
                                                state: updatedState2,
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
