// @flow

import {
    ERROR_DATABASE_SET_ADD,
} from './types';
import verror from 'verror';
import type {
    DatabaseSetAdd,
} from './types';

export const add: DatabaseSetAdd< string, string > = async ( {
    key,
    logger,
    redis,
    value,
}, ) => {

    logger.debug(
        {
            interpolationValues: [
                value,
                key,
            ],
            message: `adding value '%s' to a set associated with the '%s' key`,
        },
    );

    try {

        await redis.sadd(
            key,
            value,
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_DATABASE_SET_ADD,
            },
            `could not add the value`,
        );

    }

};
