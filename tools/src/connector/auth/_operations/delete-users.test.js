// @flow

import {
    deleteUsers,
} from './delete-users';
import {
    emptyConfig,
} from '../../../config';
import {
    emptyLogger,
} from '../../../../../common/src/logging';

describe(
    `deleteUsers`,
    () => {

        it(
            `deletes users`,
            async () => {

                const config = {
                    ...emptyConfig,
                    clientId  : `id1`,
                    region    : `region1`,
                    userPoolId: `pool1`,
                };

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

                const usernames = [
                    `user1`,
                    `user2`,
                ];

                await deleteUsers(
                    {
                        config,
                        exec,
                        logger,
                        usernames,
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
                            [
                                `aws cognito-idp admin-delete-user `
                                + `--user-pool-id pool1 `
                                + `--username user2`,
                            ],
                        ],
                    );

            },
        );

        it(
            `skips the user creation if already registered`,
            async () => {

                const config = {
                    ...emptyConfig,
                    clientId  : `id1`,
                    region    : `region1`,
                    userPoolId: `pool1`,
                };

                const exec = jest.fn(
                    (
                        command: string,
                    ) => {

                        if (
                            command.includes(
                                `aws cognito-idp sign-up`,
                            )
                            && command.includes(
                                `user1`,
                            )
                        ) {

                            return Promise.reject(
                                Error(
                                    `User already exists`,
                                ),
                            );

                        }

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

                const usernames = [
                    `user1`,
                    `user2`,
                ];

                await deleteUsers(
                    {
                        config,
                        exec,
                        logger,
                        usernames,
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
                            [
                                `aws cognito-idp admin-delete-user `
                                + `--user-pool-id pool1 `
                                + `--username user2`,
                            ],
                        ],
                    );

            },
        );

        it(
            `fails on sign up error`,
            async () => {

                const config = {
                    ...emptyConfig,
                    clientId  : `id1`,
                    password  : `password1`,
                    region    : `region1`,
                    userPoolId: `pool1`,
                    usernames : [
                        `user1`,
                        `user2`,
                    ],
                };

                const exec = jest.fn(
                    () => {

                        return Promise.reject(
                            Error(
                                `unexpected error`,
                            ),
                        );

                    },
                );

                const logger = {
                    ...emptyLogger,
                };

                const usernames = [
                    `user1`,
                    `user2`,
                ];

                const actualPromise = deleteUsers(
                    {
                        config,
                        exec,
                        logger,
                        usernames,
                    },
                );

                await expect(
                    actualPromise,
                ).rejects.toBeTruthy();

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
                            [
                                `aws cognito-idp admin-delete-user `
                                + `--user-pool-id pool1 `
                                + `--username user2`,
                            ],
                        ],
                    );

            },
        );

        it(
            `fails on confirm sign up error`,
            async () => {

                const config = {
                    ...emptyConfig,
                    clientId  : `id1`,
                    password  : `password1`,
                    region    : `region1`,
                    userPoolId: `pool1`,
                    usernames : [
                        `user1`,
                        `user2`,
                    ],
                };

                const exec = jest.fn(
                    () => {

                        return Promise.reject(
                            Error(
                                `unexpected error`,
                            ),
                        );

                    },
                );

                const logger = {
                    ...emptyLogger,
                };

                const usernames = [
                    `user1`,
                    `user2`,
                ];

                const actualPromise = deleteUsers(
                    {
                        config,
                        exec,
                        logger,
                        usernames,
                    },
                );

                await expect(
                    actualPromise,
                ).rejects.toBeTruthy();

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
                            [
                                `aws cognito-idp admin-delete-user `
                                + `--user-pool-id pool1 `
                                + `--username user2`,
                            ],
                        ],
                    );

            },
        );

    },
);
