// @flow

import {
    dummyMultiRedis,
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import type {
    DatabaseValueCasTestScenario,
} from '../types';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';

export const scenario01: DatabaseValueCasTestScenario = {
    create: () => {

        const logger = {
            ...emptyLogger,
        };

        const key = `key1`;
        const previousValue = `value1`;
        const transformedValue = `value2`;


        const mockValueTransformer = jest.fn(
            () => {

                return {
                    errors: [],
                    value : transformedValue,
                };

            },
        );

        const mockExec = jest.fn(
            () => {

                return Promise.resolve(
                    [
                        `OK`,
                    ],
                );

            },
        );

        const mockSet = jest.fn(
            () => {

                return {
                    ...dummyMultiRedis,
                    exec: mockExec,
                };

            },
        );

        const redis = {
            ...dummyRedis,
            get: jest.fn(
                () => {

                    return Promise.resolve(
                        previousValue,
                    );

                },
            ),
            multi: jest.fn(
                () => {

                    return {
                        ...dummyMultiRedis,
                        set: mockSet,
                    };

                },
            ),
            unwatch: jest.fn(
                () => {

                    return Promise.resolve(
                        `OK`,
                    );

                },
            ),
            watch: jest.fn(
                () => {

                    return Promise.resolve(
                        `OK`,
                    );

                },
            ),
        };

        const args = {
            key,
            logger,
            redis,
            valueTransformer: mockValueTransformer,
        };

        const expectations = {
            result: {
                errors       : [],
                previousValue: `value1`,
                savedValue   : `value2`,
            },
            sideEffects: [
                {
                    calls: [
                        [
                            `key1`,
                        ],
                    ],
                    mockFunction: redis.watch,
                },
                {
                    calls: [
                        [
                            `key1`,
                        ],
                    ],
                    mockFunction: redis.get,
                },
                {
                    calls       : [],
                    mockFunction: redis.unwatch,
                },
                {
                    calls: [
                        [],
                    ],
                    mockFunction: redis.multi,
                },
                {
                    calls: [
                        [
                            `key1`,
                            transformedValue,
                        ],
                    ],
                    mockFunction: mockSet,
                },
                {
                    calls: [
                        [],
                    ],
                    mockFunction: mockExec,
                },
                {
                    calls: [
                        [
                            {
                                value: `value1`,
                            },
                        ],
                    ],
                    mockFunction: mockValueTransformer,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `sets the value if value has not changed before the beginning of the value transformation operation`,
};
