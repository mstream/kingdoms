// @flow

import {
    confirmSignUp, signUp,
} from '../../client/cognito';
import type {
    Config,
} from '../../config/types';
import type {
    User,
} from './types';
import verror from 'verror';
import type {
    Logger,
} from '../../../../common/src/logging/types';
import type {
    Exec,
} from '../../../../common/src/execute/types';

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
                `signing up user '%s'`,
                username,
            );

            return signUp(
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
                `skipping user '%s' user: `
                + `already exists`,
                result.username,
            );

        },
    );

    if ( fatalErrorResults.length > 0 ) {

        fatalErrorResults.forEach(
            (
                result: FailedResult,
            ) => {

                logger.warn(
                    `failed to sign up '%s' user: %s`,
                    result.username,
                    result.error,
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
                `confirming the sign up for user '%s'`,
                username,
            );

            return confirmSignUp(
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
                    `failed to confirm the sign up for `
                    + `'%s' user: %s`,
                    result.username,
                    result.error,
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
        `creating test users in '%s' user pool`,
        config.userPoolId,
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
