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
    mockSendMessage,
} from '../../clients/sqs';
import {
    serializeJson,
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
import type {
    WorldStateUpdatePayload,
} from '../../connectors/queue/send-world-state-update/types';

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/date-provider`,
);

jest.mock(
    `../../clients/redis`,
);

jest.mock(
    `../../clients/sqs`,
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

                        if ( key.includes(
                            `world1`,
                        ) ) {

                            return Promise.resolve(
                                serializeJson(
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
                                serializeJson(
                                    {
                                        json: state2,
                                    },
                                ),
                            );

                        }

                        return Promise.reject(
                            `mockGet: ${ key }`,
                        );

                    },
                );

                mockSmembers.mockImplementation(
                    () => {

                        return Promise.resolve(
                            [
                                `world1`,
                                `world2`,
                            ],
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

                mockSendMessage.mockImplementation(
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

                const stateUpdateMessagePayload1: WorldStateUpdatePayload = {
                    state  : updatedState1,
                    time   : `2000-01-01T01:00:00.000Z`,
                    worldId: `world1`,
                };

                const stateUpdateMessagePayload2: WorldStateUpdatePayload = {
                    state  : updatedState2,
                    time   : `2000-01-01T01:00:00.000Z`,
                    worldId: `world2`,
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
                                serializeJson(
                                    {
                                        json: updatedState1,
                                    },
                                ),
                            ],
                            [
                                `state-by-world:${ stubConfig.environment }:world2`,
                                serializeJson(
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
                                    MessageBody: serializeJson(
                                        {
                                            json: stateUpdateMessagePayload1,
                                        },
                                    ),
                                    QueueUrl: stubConfig.sqs.queueUrls.worldStateUpdate,
                                },
                            ],
                            [
                                {
                                    MessageBody: serializeJson(
                                        {
                                            json: stateUpdateMessagePayload2,
                                        },
                                    ),
                                    QueueUrl: stubConfig.sqs.queueUrls.worldStateUpdate,
                                },
                            ],
                        ],
                        expect,
                        mockFunction: mockSendMessage,
                    },
                );

            },
        );

    },
);

