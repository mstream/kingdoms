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

export const ERROR_AWS_COGNITO_SIGN_UP: 'ERROR_AWS_COGNITO_SIGN_UP'
    = `ERROR_AWS_COGNITO_SIGN_UP`;

export const signUp = async ( {
    clientId,
    exec,
    logger,
    password,
    region,
    username,
}: $ReadOnly< {|
    clientId: string,
    exec: Exec,
    logger: Logger,
    password: string,
    region: string,
    username: string,
|} >, ): Promise< void > => {

    const options
        = `--region ${ region } `
        + `--client-id ${ clientId } `
        + `--username ${ username } `
        + `--password ${ password }`;

    const command = `aws cognito-idp sign-up ${ options }`;

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
                name : ERROR_AWS_COGNITO_SIGN_UP,
            },
            `cognito sign up error`,
        );

    }

};
