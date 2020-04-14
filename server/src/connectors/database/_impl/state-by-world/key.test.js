// @flow

import {
    createKey,
} from './key';

describe(
    `createStatesKey`,
    () => {

        it(
            `creates a valid key`,
            async () => {

                const environment = `env1`;
                const worldId = `world1`;
                const expected = `state-by-world:env1:world1`;

                const actual = createKey(
                    {
                        key: {
                            environment,
                            worldId,
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
