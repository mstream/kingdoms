// @flow

import {
    createPino,
} from './pino';
import verror from 'verror';
import type {
    Log, LogError, Logger,
} from './types';


const createLog = (
    {
        level,
        pino,
    }: $ReadOnly< {

        // $FlowFixMe
        pino: any,
        level: 'debug' | 'info' | 'warn',
    } >,
): Log => {

    return (
        {
            interpolationValues,
            message,
        },
    ) => {

        pino[ level ](
            message,
            interpolationValues,
        );

    };

};

const createLogError = (
    {
        pino,
    }: $ReadOnly< {

        // $FlowFixMe
        pino: any,
    } >,
): LogError => {

    return (
        {
            error,
            interpolationValues,
            message,
        },
    ) => {

        pino.error(
            {
                err: error,
            },
            message,
            interpolationValues,
        );

    };

};

export const createLogger = (
    {
        config,
    }: $ReadOnly< {| config: $ReadOnly< { loggingLevel: string } > |} >,
): Logger => {

    try {

        const pino = createPino(
            {
                loggingLevel: config.loggingLevel,
            },
        );

        return {
            debug: createLog(
                {
                    level: `debug`,
                    pino,
                },
            ),
            error: createLogError(
                {
                    pino,
                },
            ),
            info: createLog(
                {
                    level: `info`,
                    pino,
                },
            ),
            warn: createLog(
                {
                    level: `warn`,
                    pino,
                },
            ),
        };

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : `LOGGING`,
            },
            `could not create a logger`,
        );

    }

};

export const emptyLogger: Logger = {
    debug: () => {

        return undefined;

    },
    error: () => {

        return undefined;

    },
    info: () => {

        return undefined;

    },
    warn: () => {

        return undefined;

    },
};
