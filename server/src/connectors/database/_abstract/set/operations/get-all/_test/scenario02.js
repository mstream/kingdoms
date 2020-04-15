// @flow

import {
    ERROR_DATABASE_SET_GET_ALL,
} from '../types';
import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import verror from 'verror';
import type {
    DatabaseSetGetAllTestScenario,
} from '../types';

export const scenario02: DatabaseSetGetAllTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const redis = {
            ...dummyRedis,
            smembers: jest.fn(
                () => {

                    return Promise.reject(
                        Error(
                            `smembers error`,
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
                        `smembers error`,
                    ),
                    name: ERROR_DATABASE_SET_GET_ALL,
                },
                `could not retrieve the values`,
            ),
            sideEffects: [
                {
                    calls: [
                        [
                            `key1`,
                        ],
                    ],
                    mockFunction: redis.smembers,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `throws error when redis fails to get the values`,
};
