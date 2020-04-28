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

type ErrorKey = 'ERROR_AWS_COGNITO_SIGN_UP_CONFIRMATION';

export const ERROR_AWS_COGNITO_SIGN_UP_CONFIRMATION: ErrorKey
    = `ERROR_AWS_COGNITO_SIGN_UP_CONFIRMATION`;

export const adminConfirmSignUp = async (
    {
        exec,
        logger,
        username,
        userPoolId,
    }: $ReadOnly< {
        exec: Exec,
        logger: Logger,
        username: string,
        userPoolId: string,
    } >, ): Promise< void > => {

    const options = `--user-pool-id ${ userPoolId } --username ${ username }`;
    const command = `aws cognito-idp admin-confirm-sign-up ${ options }`;

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
                name : ERROR_AWS_COGNITO_SIGN_UP_CONFIRMATION,
            },
            `cognito sign up confirmation error`,
        );

    }

};
