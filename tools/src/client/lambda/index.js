// @flow

import type {
    Logger,
} from '../../../../common/src/logging/types';
import verror from 'verror';
import {
    execute,
} from '../../../../common/src/execute';
import type {
    Exec,
} from '../../../../common/src/execute/types';

export const ERROR_AWS_LAMBDA_INVOKE: 'ERROR_AWS_LAMBDA_INVOKE'
    = `ERROR_AWS_LAMBDA_INVOKE`;

export const invokeFunction = async ( {
    exec,
    logger,
    name,
    payload,
}: {
    exec: Exec,
    logger: Logger,
    name: string,
    payload: string,
}, ): Promise< void > => {

    const options
        = `--function-name ${ name } `
        + `--invocation-type RequestResponse `
        + `--payload '${ payload }' `
        + `/dev/stdout`;

    const command = `aws lambda invoke ${ options }`;


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
                name : ERROR_AWS_LAMBDA_INVOKE,
            },
            `lambda execution error`,
        );

    }

};
