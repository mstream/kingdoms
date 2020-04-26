// @flow

import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import type {
    DatabaseValueRemoveTestScenario,
} from '../types';

export const scenario01: DatabaseValueRemoveTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };


        const redis = {
            ...dummyRedis,
            del: jest.fn(
                () => {

                    return Promise.resolve(
                        1,
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
            result     : undefined,
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
    name: `removes value`,
};
