// @flow

import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import type {
    DatabaseSetAddTestScenario,
} from '../types';

export const scenario01: DatabaseSetAddTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const redis = {
            ...dummyRedis,
            sadd: jest.fn(
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
                    mockFunction: redis.sadd,
                },
            ],
        };

        return {
            args,
            expectations,
        };

    },
    name: `adds value`,
};
