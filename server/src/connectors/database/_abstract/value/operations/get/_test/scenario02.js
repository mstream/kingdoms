// @flow

import {
    ERROR_DATABASE_VALUE_GET,
} from '../index';
import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import verror from 'verror';
import type {
    DatabaseValueGetTestScenario,
} from '../types';

export const scenario02: DatabaseValueGetTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const redis = {
            ...dummyRedis,
            get: jest.fn(
                () => {

                    return Promise.reject(
                        Error(
                            `get error`,
                        ),
                    );

                },
            ),
        };

        const args = {
            key,
            logger,
            redis,
        };

        const expectations = {
            error: new verror.VError(
                {
                    cause: Error(
                        `get error`,
                    ),
                    name: ERROR_DATABASE_VALUE_GET,
                },
                `could not retrieve the value`,
            ),
            sideEffects: [
                {
                    calls: [
                        [
                            `key1`,
                        ],
                    ],
                    mockFunction: redis.get,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `throws error when redis fails to get the value`,
};
