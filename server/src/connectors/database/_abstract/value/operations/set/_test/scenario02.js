// @flow

import {
    ERROR_DATABASE_VALUE_SET,
} from '../index';
import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import verror from 'verror';
import type {
    DatabaseValueSetTestScenario,
} from '../types';

export const scenario02: DatabaseValueSetTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const redis = {
            ...dummyRedis,
            set: jest.fn(
                () => {

                    return Promise.reject(
                        Error(
                            `set error`,
                        ),
                    );

                },
            ),
        };
        const value = `value1`;

        const args = {
            key,
            logger,
            redis,
            value,
        };

        const expectations = {
            error: new verror.VError(
                {
                    cause: Error(
                        `set error`,
                    ),
                    name: ERROR_DATABASE_VALUE_SET,
                },
                `could not save the value`,
            ),
            sideEffects: [
                {
                    calls: [
                        [
                            `key1`,
                            `value1`,
                        ],
                    ],
                    mockFunction: redis.set,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `throws error when redis fails to save the value`,
};
