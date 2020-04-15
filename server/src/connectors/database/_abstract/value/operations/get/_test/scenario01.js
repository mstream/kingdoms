// @flow

import {
    dummyRedis,
} from '../../../../../../../clients/redis/utils';
import {
    emptyLogger,
} from '../../../../../../../../../common/src/logging';
import type {
    DatabaseValueGetTestScenario,
} from '../types';

export const scenario01: DatabaseValueGetTestScenario = {
    create: () => {

        const key = `key1`;

        const logger = {
            ...emptyLogger,
        };


        const redis = {
            ...dummyRedis,
            get: jest.fn(
                () => {

                    return Promise.resolve(
                        value,
                    );

                },
            ),
        };

        const value = `value1`;

        const args = {
            key,
            logger,
            redis,
        };

        const expectations = {
            result     : `value1`,
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
    name: `retrieves value`,
};
