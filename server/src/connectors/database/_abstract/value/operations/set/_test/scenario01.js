// @flow

import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import type {
    DatabaseValueSetTestScenario,
} from '../types';

export const scenario01: DatabaseValueSetTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const redis = {
            ...dummyRedis,
            set: jest.fn(
                () => {

                    return Promise.resolve(
                        `OK`,
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
                    mockFunction: redis.set,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `saves value`,
};
