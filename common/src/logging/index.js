// @flow

import pino from 'pino';
import type {
    Logger,
} from './types';
import verror from 'verror';

export const createLogger = (
    {
        config,
    }: $ReadOnly< {| config: $ReadOnly< { loggingLevel: string } > |} >,
): Logger => {

    try {

        return pino(
            {
                browser: {
                    write: {
                        debug: (
                            o,
                        ) => {

                            console.info(
                                o.msg,
                            );

                        },
                        error: (
                            o,
                        ) => {

                            console.error(
                                o.msg,
                            );

                        },
                        info: (
                            o,
                        ) => {

                            console.info(
                                o.msg,
                            );

                        },
                        warn: (
                            o,
                        ) => {

                            console.warn(
                                o.msg,
                            );

                        },
                    },
                },
                level      : config.loggingLevel,
                prettyPrint: true,
            },
        );

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
