// @flow

import {
    execute,
} from '../../../../../common/src/execute';
import verror from 'verror';
import type {
    Exec,
} from '../../../../../common/src/execute/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';

export const ERROR_AWS_COGNITO_DELETE: 'ERROR_AWS_COGNITO_DELETE'
    = `ERROR_AWS_COGNITO_DELETE`;

export const adminDeleteUser = async ( {
    exec,
    logger,
    userPoolId,
    username,
}: $ReadOnly< {
    exec: Exec,
    logger: Logger,
    userPoolId: string,
    username: string,
} >, ): Promise< void > => {

    const options = `--user-pool-id ${ userPoolId } --username ${ username }`;
    const command = `aws cognito-idp admin-delete-user ${ options }`;

    try {

        await execute(
            {
                command,
                exec,
                logger,
            },
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_AWS_COGNITO_DELETE,
            },
            `cognito user delete error`,
        );

    }

};
