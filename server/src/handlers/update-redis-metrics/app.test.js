// @flow

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
    mockPutMetricData,
} from '../../clients/cloud-watch';
import {
    mockSmembers,
} from '../../clients/redis';
import {
    stubConfig,
} from '../../config';
import type {
    Context, ScheduledEvent,
} from '../types';

jest.mock(
    `../../clients/cloud-watch`,
);

jest.mock(
    `../../config`,
);

jest.mock(
    `../../clients/redis`,
);


describe(
    `updateRedisMetricsHandler`,
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

                const event: ScheduledEvent = {
                    ...emptyScheduledEvent,
                };

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

                mockPutMetricData.mockImplementation(
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
                                    MetricData: [
                                        {
                                            Dimensions: [
                                                {
                                                    Name : `Environment`,
                                                    Value: stubConfig.environment,
                                                },
                                            ],
                                            MetricName: `WorldsCount`,
                                            Unit      : `Count`,
                                            Value     : 2,
                                        },
                                    ],
                                    Namespace: `Kingdoms/Redis`,
                                },
                            ],
                        ],
                        expect,
                        mockFunction: mockPutMetricData,
                    },
                );

            },
        );

    },
);

