// @flow

import {
    ERROR_DATABASE_VALUE_REMOVE,
} from '../index';
import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import verror from 'verror';
import type {
    DatabaseValueRemoveTestScenario,
} from '../types';


export const scenario02: DatabaseValueRemoveTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const redis = {
            ...dummyRedis,
            del: jest.fn(
                () => {

                    return Promise.reject(
                        Error(
                            `del error`,
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
                        `del error`,
                    ),
                    name: ERROR_DATABASE_VALUE_REMOVE,
                },
                `could not remove the value`,
            ),
            sideEffects: [
                {
                    calls: [
                        [
                            `key1`,
                        ],
                    ],
                    mockFunction: redis.del,
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
