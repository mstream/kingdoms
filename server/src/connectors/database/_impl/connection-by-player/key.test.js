// @flow

import {
    createKey,
} from './key';

describe(
    `createConnectionsKey`,
    () => {

        it(
            `creates a valid key`,
            async () => {

                const environment = `env1`;
                const playerId = `player1`;
                const expected = `connection-by-player:env1:player1`;

                const actual = createKey(
                    {
                        key: {
                            environment,
                            playerId,
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
