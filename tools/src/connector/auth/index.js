// @flow

import type { Config } from '../../config/types';
import { confirmSignUp, signUp } from '../../client/cognito';

type SuccessfulResult = $ReadOnly<{
    error: null,
    username: string,
}>;

type FailedResult = $ReadOnly<{
    error: string,
    username: string,
}>;

type Result = SuccessfulResult | FailedResult;

const isUserAlreadyRegistered = ({
    errorMessage,
}: {
    errorMessage: string,
}): boolean => {
    return errorMessage.includes('User already exists');
};

const signUpUsers = async ({
    config,
    exec,
}: {
    config: Config,
    exec: (string) => Promise<void>,
}): Promise<$ReadOnlyArray<string>> => {
    const signUpPromises = config.usernames.map((username: string) => {
        console.info(`signing up user '${username}'`);

        return signUp({
            clientId: config.clientId,
            exec,
            password: config.password,
            region: config.region,
            username,
        })
            .then(() => {
                return {
                    error: null,
                    username,
                };
            })
            .catch((error) => {
                return {
                    error:
                        error.message != null ? error.message : 'unknown error',
                    username,
                };
            });
    });

    const results: $ReadOnlyArray<Result> = await Promise.all(signUpPromises);

    const errorResults: $ReadOnlyArray<FailedResult> = results.reduce(
        (errorResults, result: Result) => {
            if (result.error != null) {
                return [
                    ...errorResults,
                    {
                        error: result.error,
                        username: result.username,
                    },
                ];
            } else {
                return errorResults;
            }
        },
        [],
    );

    const warningErrorResults = errorResults.reduce(
        (warningErrorResults, result: FailedResult) => {
            return isUserAlreadyRegistered({ errorMessage: result.error })
                ? [...warningErrorResults, result]
                : warningErrorResults;
        },
        [],
    );

    const fatalErrorResults = errorResults.reduce(
        (fatalErrorResults, result: FailedResult) => {
            return !isUserAlreadyRegistered({ errorMessage: result.error })
                ? [...fatalErrorResults, result]
                : fatalErrorResults;
        },
        [],
    );

    warningErrorResults.forEach((result: FailedResult) => {
        console.info(`skipping user '${result.username}' user: already exists`);
    });

    if (fatalErrorResults.length > 0) {
        fatalErrorResults.forEach((result: FailedResult) => {
            console.info(
                `failed to sign up '${result.username}' user: ${result.error}`,
            );
        });
        throw Error('sign up error');
    }

    return results.reduce((createdUsers, result: Result) => {
        return result.error != null
            ? createdUsers
            : [...createdUsers, result.username];
    }, []);
};

const confirmUsersSignUp = async ({
    config,
    exec,
    usernames,
}: {
    config: Config,
    exec: (string) => Promise<void>,
    usernames: $ReadOnlyArray<string>,
}): Promise<void> => {
    const confirmPromises = usernames.map((username: string) => {
        console.info(`confirming the sign up for user '${username}'`);

        return confirmSignUp({
            exec,
            username,
            userPoolId: config.userPoolId,
        })
            .then(() => {
                return {
                    error: null,
                    username,
                };
            })
            .catch((error) => {
                return {
                    error:
                        error.message != null ? error.message : 'unknown error',
                    username,
                };
            });
    });

    const results: $ReadOnlyArray<Result> = await Promise.all(confirmPromises);

    const errorResults: $ReadOnlyArray<FailedResult> = results.reduce(
        (errorResults, result: Result) => {
            if (result.error != null) {
                return [
                    ...errorResults,
                    {
                        error: result.error,
                        username: result.username,
                    },
                ];
            } else {
                return errorResults;
            }
        },
        [],
    );

    if (errorResults.length > 0) {
        errorResults.forEach((result: FailedResult) => {
            console.info(
                `failed to confirm the sign up for '${result.username}' user: ${result.error}`,
            );
        });
        throw Error('sign up confirmation error');
    }
};

export const createTestUsers = async ({
    config,
    exec,
}: {
    config: Config,
    exec: (string) => Promise<void>,
}) => {
    console.info(`creating test users in '${config.userPoolId}' user pool`);
    const usernames = await signUpUsers({ config, exec });
    await confirmUsersSignUp({ config, exec, usernames });
};
