// @flow

import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import type {
    DatabaseSetGetAllTestScenario,
} from '../types';

export const scenario01: DatabaseSetGetAllTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };

        const values = [
            `value1`,
            `value2`,
        ];

        const redis = {
            ...dummyRedis,
            smembers: jest.fn(
                () => {

                    return Promise.resolve(
                        values,
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
            result: [
                `value1`,
                `value2`,
            ],
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
    name: `gets all values`,
};
