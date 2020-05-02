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
        {
            interpolationValues: [
                command,
            ],
            message: `invoking command: %s`,
        },
    );

    try {

        const {
            stderr, stdout,
        } = await exec(
            command,
        );

        if ( stdout.length > 0 ) {

            const commandSummary = command.substring(
                0,
                commandSummaryLength,
            );

            logger.debug(
                {
                    interpolationValues: [
                        `${ commandSummary }...`,
                        stdout,
                    ],
                    message: `command '%s' execution stdout: %s`,
                },
            );

        }

        if ( stderr.length > 0 ) {

            const commandSummary = command.substring(
                0,
                commandSummaryLength,
            );

            logger.debug(
                {
                    interpolationValues: [
                        `${ commandSummary }...`,
                        stderr,
                    ],
                    message: `command '%s' execution result stderr: %s`,
                },
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
