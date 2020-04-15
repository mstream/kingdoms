// @flow

import {
    ERROR_DATABASE_SET_ADD,
} from '../types';
import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import verror from 'verror';
import type {
    DatabaseSetAddTestScenario,
} from '../types';

export const scenario02: DatabaseSetAddTestScenario = {
    create: () => {

        const logger = {
            ...emptyLogger,
        };

        const key = `key1`;

        const redis = {
            ...dummyRedis,
            sadd: jest.fn(
                () => {

                    return Promise.reject(
                        Error(
                            `sadd error`,
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
                        `sadd error`,
                    ),
                    name: ERROR_DATABASE_SET_ADD,
                },
                `could not add the value`,
            ),
            sideEffects: [
                {
                    calls: [
                        [
                            `key1`,
                            `value1`,
                        ],
                    ],
                    mockFunction: redis.sadd,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `throws error when redis fails to add the value`,
};
