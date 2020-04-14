// @flow

import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import type {
    DatabaseSetRemoveTestScenario,
} from '../types';
import {
    ERROR_DATABASE_SET_REMOVE,
} from '../types';
import verror from 'verror';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';

export const scenario02: DatabaseSetRemoveTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const redis = {
            ...dummyRedis,
            srem: jest.fn(
                () => {

                    return Promise.reject(
                        Error(
                            `srem error`,
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
                        `srem error`,
                    ),
                    name: ERROR_DATABASE_SET_REMOVE,
                },
                `could not remove the value`,
            ),
            sideEffects: [
                {
                    calls: [
                        [
                            `key1`,
                            `value1`,
                        ],
                    ],
                    mockFunction: redis.srem,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `throws error when redis fails to remove the value`,
};
