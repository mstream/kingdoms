// @flow

import {
    emptyLogger,
} from '../../../../../common/src/logging';
import {
    signUp,
} from './sign-up';

describe(
    `signUp`,
    () => {

        it(
            `produces a valid command`,
            async () => {

                const exec = jest.fn(
                    () => {

                        return Promise.resolve(
                            {
                                stderr: ``,
                                stdout: ``,
                            },
                        );

                    },
                );
                const clientId = `id1`;
                const logger = {
                    ...emptyLogger,
                };
                const password = `password1`;
                const region = `region1`;
                const username = `user1`;

                await signUp(
                    {
                        clientId,
                        exec,
                        logger,
                        password,
                        region,
                        username,
                    },
                );

                expect(
                    exec.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `aws cognito-idp sign-up `
                                + `--region region1 `
                                + `--client-id id1 `
                                + `--username user1 `
                                + `--password password1`,
                            ],
                        ],
                    );

            },
        );

    },
);
