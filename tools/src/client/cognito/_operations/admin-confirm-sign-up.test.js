// @flow

import {
    adminConfirmSignUp,
} from './admin-confirm-sign-up';
import {
    emptyLogger,
} from '../../../../../common/src/logging';

describe(
    `adminConfirmSignUp`,
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

                await adminConfirmSignUp(
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
                                + `--user-pool-id pool1 `
                                + `--username user1`,
                            ],
                        ],
                    );

            },
        );

    },
);
