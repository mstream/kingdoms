// @flow


import {
    cognito,
} from '../../../client/cognito';
import type {
    Config,
} from '../../../config/types';
import type {
    Exec,
} from '../../../../../common/src/execute/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';

export const deleteUsers = async ( {
    config,
    exec,
    logger,
    usernames,
}: {
    config: Config,
    exec: Exec,
    logger: Logger,
    usernames: $ReadOnlyArray< string >,
}, ) => {

    logger.info(
        `deleting users in '%s' user pool`,
        config.userPoolId,
    );

    const deleteUserPromises = usernames.map(
        (
            username: string,
        ) => {

            return cognito.adminDeleteUser(
                {
                    exec,
                    logger,
                    userPoolId: config.userPoolId,
                    username,
                },
            );

        },
    );

    await Promise.all(
        deleteUserPromises,
    );

};
