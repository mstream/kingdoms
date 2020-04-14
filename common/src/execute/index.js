// @flow

import verror from 'verror';
import type {
    Exec,
} from './types';
import type {
    Logger,
} from '../logging/types';


export const ERROR_EXEC: 'ERROR_EXEC'
    = `ERROR_EXEC`;

const commandSummaryLength = 200;

export const execute = async ( {
    command,
    exec,
    logger,
}: {
    command: string,
    exec: Exec,
    logger: Logger,
}, ): Promise< void > => {

    logger.debug(
        `invoking command: %s`,
        command,
    );

    try {

        const {
            stderr, stdout,
        } = await exec(
            command,
        );

        if (stdout.length > 0) {
            logger.debug(
                `command '%s' execution stdout: %s`,
                `${ command.substring(
                    0,
                    commandSummaryLength,
                ) }...`,
                stdout,
            );
        }

        if (stderr.length > 0) {
            logger.debug(
                `command '%s' execution result stderr: %s`,
                `${ command.substring(
                    0,
                    commandSummaryLength,
                ) }...`,
                stderr,
            );
        }
    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_EXEC,
            },
            `execution error`,
        );

    }

};
