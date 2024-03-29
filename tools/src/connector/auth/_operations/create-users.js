// @flow

import {
    cognito,
} from '../../../client/cognito';
import verror from 'verror';
import type {
    Config,
} from '../../../config/types';
import type {
    Exec,
} from '../../../../../common/src/execute/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';
import type {
    User,
} from '../types';

type SuccessfulResult = $ReadOnly< {
    error: null,
    username: string,
} >;

type FailedResult = $ReadOnly< {
    error: string,
    username: string,
} >;

type Result = SuccessfulResult | FailedResult;

const isUserAlreadyRegisteredErrorMessage = (
    {
        errorMessage,
    }: {
        errorMessage: string,
    },
): boolean => {

    return errorMessage.includes(
        `User already exists`,
    );

};

const signUpUsers = async ( {
    config,
    exec,
    logger,
    users,
}: {
    config: Config,
    exec: Exec,
    logger: Logger,
    users: $ReadOnlyArray< User >,
}, ): Promise< $ReadOnlyArray< string > > => {

    const signUpPromises = users.map(
        (
            user: User,
        ) => {

            const {
                password, username,
            } = user;

            logger.info(
                {
                    interpolationValues: [
                        username,
                    ],
                    message: `signing up user '%s'`,
                },
            );

            return cognito.signUp(
                {
                    clientId: config.clientId,
                    exec,
                    logger,
                    password,
                    region  : config.region,
                    username,
                },
            )
                .then(
                    () => {

                        return {
                            error: null,
                            username,
                        };

                    },
                )
                .catch(
                    (
                        error,
                    ) => {

                        return {
                            error:
                                error.message == null
                                    ? `unknown error`
                                    : error.message,
                            username,
                        };

                    },
                );

        },
    );

    const results: $ReadOnlyArray< Result > = await Promise.all(
        signUpPromises,
    );

    const errorResults: $ReadOnlyArray< FailedResult > = results.reduce(
        (
            errorResults, result: Result,
        ) => {

            if ( result.error == null ) {

                return errorResults;

            }

            return [
                ...errorResults,
                {
                    error   : result.error,
                    username: result.username,
                },
            ];

        },
        [],
    );

    const warningErrorResults = errorResults.reduce(
        (
            warningErrorResults, result: FailedResult,
        ) => {

            return isUserAlreadyRegisteredErrorMessage(
                {
                    errorMessage: result.error,
                },
            )
                ? [
                    ...warningErrorResults,
                    result,
                ]
                : warningErrorResults;

        },
        [],
    );

    const fatalErrorResults = errorResults.reduce(
        (
            fatalErrorResults, result: FailedResult,
        ) => {

            const isUserAlreadyRegistered = isUserAlreadyRegisteredErrorMessage(
                {
                    errorMessage: result.error,
                },
            );

            if ( isUserAlreadyRegistered ) {

                return fatalErrorResults;

            }

            return [
                ...fatalErrorResults,
                result,
            ];

        },
        [],
    );

    warningErrorResults.forEach(
        (
            result: FailedResult,
        ) => {

            logger.info(
                {
                    interpolationValues: [
                        result.username,
                    ],
                    message: `skipping already existing '%s' user`,
                },
            );

        },
    );

    if ( fatalErrorResults.length > 0 ) {

        fatalErrorResults.forEach(
            (
                result: FailedResult,
            ) => {

                logger.warn(
                    {
                        interpolationValues: [
                            result.username,
                            result.error,
                        ],
                        message: `failed to sign up '%s' user: %s`,
                    },
                );

            },
        );

        throw new verror.VError(
            {
                name: `SIGN_UP`,
            },
            `at least one user could not be registered`,
        );

    }

    return results.reduce(
        (
            createdUsers, result: Result,
        ) => {

            if ( result.error == null ) {

                return [
                    ...createdUsers,
                    result.username,
                ];

            }

            return createdUsers;

        },
        [],
    );

};

const confirmUsersSignUp = async ( {
    config,
    exec,
    logger,
    usernames,
}: {
    config: Config,
    exec: Exec,
    logger: Logger,
    usernames: $ReadOnlyArray< string >,
}, ): Promise< void > => {

    const confirmPromises = usernames.map(
        (
            username: string,
        ) => {

            logger.info(
                {
                    interpolationValues: [
                        username,
                    ],
                    message: `confirming the sign up for user '%s'`,
                },
            );

            return cognito.adminConfirmSignUp(
                {
                    exec,
                    logger,
                    userPoolId: config.userPoolId,
                    username,
                },
            )
                .then(
                    () => {

                        return {
                            error: null,
                            username,
                        };

                    },
                )
                .catch(
                    (
                        error,
                    ) => {

                        return {
                            error:
                                error.message == null
                                    ? `unknown error`
                                    : error.message,
                            username,
                        };

                    },
                );

        },
    );

    const results: $ReadOnlyArray< Result > = await Promise.all(
        confirmPromises,
    );

    const errorResults: $ReadOnlyArray< FailedResult > = results.reduce(
        (
            errorResults, result: Result,
        ) => {

            if ( result.error == null ) {

                return errorResults;

            }

            return [
                ...errorResults,
                {
                    error   : result.error,
                    username: result.username,
                },
            ];

        },
        [],
    );

    if ( errorResults.length > 0 ) {

        errorResults.forEach(
            (
                result: FailedResult,
            ) => {

                logger.info(
                    {
                        interpolationValues: [
                            result.username,
                            result.error,
                        ],
                        message: `failed to confirm the sign up for '%s' user: %s`,
                    },
                );

            },
        );

        throw Error(
            `sign up confirmation error`,
        );

    }

};

export const createUsers = async ( {
    config,
    exec,
    logger,
    users,
}: {
    config: Config,
    exec: Exec,
    logger: Logger,
    users: $ReadOnlyArray< User >,
}, ) => {

    logger.info(
        {
            interpolationValues: [
                config.userPoolId,

            ],
            message: `creating users in '%s' user pool`,
        },
    );

    const usernames = await signUpUsers(
        {
            config,
            exec,
            logger,
            users,
        },
    );

    await confirmUsersSignUp(
        {
            config,
            exec,
            logger,
            usernames,
        },
    );

};
