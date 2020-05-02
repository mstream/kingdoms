// @flow

import pino from "pino";
import verror from "verror";

export const createPino = (
    {
        loggingLevel,
    }: $ReadOnly< {|
        loggingLevel: string
    |} >,
) => {

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
                level      : loggingLevel,
                prettyPrint: true,
            },
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : `LOGGING`,
            },
            `could not create a pino logger`,
        );

    }

};
