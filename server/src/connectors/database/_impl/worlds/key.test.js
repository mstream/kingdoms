// @flow

import {
    createWorldsKey,
} from './key';

describe(
    `createWorldsKey`,
    () => {

        it(
            `creates a valid key`,
            async () => {

                const environment = `env1`;
                const expected = `worlds:env1`;

                const actual = createWorldsKey(
                    {
                        key: {
                            environment,
                        },
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

    },
);
