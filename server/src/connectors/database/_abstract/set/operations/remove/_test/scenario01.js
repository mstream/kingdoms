// @flow

import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import type {
    DatabaseSetRemoveTestScenario,
} from '../types';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';

export const scenario01: DatabaseSetRemoveTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };


        const redis = {
            ...dummyRedis,
            srem: jest.fn(
                () => {

                    return Promise.resolve(
                        1,
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
            result     : undefined,
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
    name: `removes value`,
};
