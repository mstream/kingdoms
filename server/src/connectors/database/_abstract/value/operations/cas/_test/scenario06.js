// @flow

import {
    ERROR_DATABASE_VALUE_CAS,
} from '../index';
import {
    dummyMultiRedis,
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import verror from 'verror';
import type {
    DatabaseValueCasTestScenario,
} from '../types';

export const scenario06: DatabaseValueCasTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const previousValue = `value1`;

        const mockValueTransformer = jest.fn(
            () => {

                throw Error(
                    `transformation error`,
                );

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
            error: new verror.VError(
                {
                    cause: Error(
                        `transformation error`,
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
    name: `fails and unwatches when transformation throws an error`,
};
