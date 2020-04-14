// @flow

import {
    dummyMultiRedis,
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import type {
    DatabaseValueCasTestScenario,
} from '../types';
import verror from 'verror';
import {
    ERROR_DATABASE_VALUE_CAS,
} from '../index';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';

export const scenario04: DatabaseValueCasTestScenario = {
    create: () => {

        const key = `key1`;
        const logger = {
            ...emptyLogger,
        };
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

                    return Promise.reject(
                        Error(
                            `watch error`,
                        ),
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
            error: new verror.VError(
                {
                    cause: Error(
                        `watch error`,
                    ),
                    name: ERROR_DATABASE_VALUE_CAS,
                },
                `could not compare and set the value`,
            ),
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
                    calls       : [],
                    mockFunction: redis.get,
                },
                {
                    calls       : [],
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
                    calls       : [],
                    mockFunction: mockValueTransformer,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `fails when the value cannot be watched`,
};
