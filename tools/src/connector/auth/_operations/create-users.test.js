// @flow

import {
    createUsers,
} from './create-users';
import {
    emptyConfig,
} from '../../../config';
import {
    emptyLogger,
} from '../../../../../common/src/logging';

describe(
    `createUsers`,
    () => {

        it(
            `creates users`,
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

                const users = [
                    {
                        password: `password1`,
                        username: `user1`,
                    },
                    {
                        password: `password2`,
                        username: `user2`,
                    },
                ];

                await createUsers(
                    {
                        config,
                        exec,
                        logger,
                        users,
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
                            [
                                `aws cognito-idp sign-up `
                            + `--region region1 `
                            + `--client-id id1 `
                            + `--username user2 `
                            + `--password password2`,
                            ],
                            [
                                `aws cognito-idp admin-confirm-sign-up `
                            + `--user-pool-id pool1 `
                            + `--username user1`,
                            ],
                            [
                                `aws cognito-idp admin-confirm-sign-up `
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

                const users = [
                    {
                        password: `password1`,
                        username: `user1`,
                    },
                    {
                        password: `password2`,
                        username: `user2`,
                    },
                ];

                await createUsers(
                    {
                        config,
                        exec,
                        logger,
                        users,
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
                            [
                                `aws cognito-idp sign-up `
                            + `--region region1 `
                            + `--client-id id1 `
                            + `--username user2 `
                            + `--password password2`,
                            ],
                            [
                                `aws cognito-idp admin-confirm-sign-up `
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
                                    `unexpected error`,
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

                const users = [
                    {
                        password: `password1`,
                        username: `user1`,
                    },
                    {
                        password: `password2`,
                        username: `user2`,
                    },
                ];

                const actualPromise = createUsers(
                    {
                        config,
                        exec,
                        logger,
                        users,
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
                                `aws cognito-idp sign-up `
                            + `--region region1 `
                            + `--client-id id1 `
                            + `--username user1 `
                            + `--password password1`,
                            ],
                            [
                                `aws cognito-idp sign-up `
                            + `--region region1 `
                            + `--client-id id1 `
                            + `--username user2 `
                            + `--password password2`,
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
                    (
                        command: string,
                    ) => {

                        if (
                            command.includes(
                                `aws cognito-idp admin-confirm-sign-up`,
                            )
                            && command.includes(
                                `user1`,
                            )
                        ) {

                            return Promise.reject(
                                Error(
                                    `unexpected error`,
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

                const users = [
                    {
                        password: `password1`,
                        username: `user1`,
                    },
                    {
                        password: `password2`,
                        username: `user2`,
                    },
                ];

                const actualPromise = createUsers(
                    {
                        config,
                        exec,
                        logger,
                        users,
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
                                `aws cognito-idp sign-up `
                            + `--region region1 `
                            + `--client-id id1 `
                            + `--username user1 `
                            + `--password password1`,
                            ],
                            [
                                `aws cognito-idp sign-up `
                            + `--region region1 `
                            + `--client-id id1 `
                            + `--username user2 `
                            + `--password password2`,
                            ],
                            [
                                `aws cognito-idp admin-confirm-sign-up `
                            + `--user-pool-id pool1 `
                            + `--username user1`,
                            ],
                            [
                                `aws cognito-idp admin-confirm-sign-up `
                            + `--user-pool-id pool1 `
                            + `--username user2`,
                            ],
                        ],
                    );

            },
        );

    },
);
