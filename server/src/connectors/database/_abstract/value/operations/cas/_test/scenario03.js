// @flow

import {
    dummyMultiRedis,
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import type {
    DatabaseValueCasTestScenario,
} from '../types';

export const scenario03: DatabaseValueCasTestScenario = {
    create: () => {

        const key = `key1`;
        const logger = {
            ...emptyLogger,
        };
        const previousValue = `value1`;

        const mockValueTransformer = jest.fn(
            () => {

                return {
                    errors: [
                        `transformationError1`,
                        `transformationError2`,
                    ],
                    value: null,
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
                errors: [
                    `transformationError1`,
                    `transformationError2`,
                ],
                previousValue: `value1`,
                savedValue   : null,
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
                    calls: [
                        [
                            `key1`,
                        ],
                    ],
                    mockFunction: redis.unwatch,
                },
                {
                    calls       : [],
                    mockFunction: redis.multi,
                },
                {
                    calls       : [],
                    mockFunction: mockSet,
                },
                {
                    calls       : [],
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
    name: `returns errors and unwatches when value transformation returns errors`,
};
