// @flow

import {
    adminDeleteUser,
} from './admin-delete-user';
import {
    emptyLogger,
} from '../../../../../common/src/logging';


describe(
    `adminDeleteUser`,
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
                const region = `region1`;
                const username = `user1`;
                const userPoolId = `pool1`;


                await adminDeleteUser(
                    {
                        clientId,
                        exec,
                        logger,
                        region,
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
                                `aws cognito-idp admin-delete-user `
                                + `--user-pool-id pool1 `
                                + `--username user1`,
                            ],
                        ],
                    );

            },
        );

    },
);
