// @flow

import verror from 'verror';
import type {
    DatabaseValueSet,
} from './types';

export const ERROR_DATABASE_VALUE_SET: 'ERROR_DATABASE_SET_VALUE'
    = `ERROR_DATABASE_SET_VALUE`;

export const set: DatabaseValueSet< string, string > = async ( {
    key,
    logger,
    redis,
    value,
}, ) => {

    logger.debug(
        `associating '%s' value with the key '%s'`,
        value,
        key,
    );

    try {

        await redis.set(
            key,
            value,
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_DATABASE_VALUE_SET,
            },
            `could not save the value`,
        );

    }

};
