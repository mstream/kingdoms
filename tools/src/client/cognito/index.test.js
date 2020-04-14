// @flow

import {
    confirmSignUp, signUp,
} from './index';
import {
    emptyLogger,
} from '../../../../common/src/logging';

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

describe(
    `confirmSignUp`,
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
                const logger = {
                    ...emptyLogger,
                };
                const username = `user1`;
                const userPoolId = `pool1`;

                await confirmSignUp(
                    {
                        exec,
                        logger,
                        userPoolId,
                        username,
                    },
                );

                expect(
                    exec.mock.calls,
                )
                    .toEqual(
                        [
                            [
                                `aws cognito-idp admin-confirm-sign-up `
                            + `--user-pool-id `
                            + `pool1 --username user1`,
                            ],
                        ],
                    );

            },
        );

    },
);
