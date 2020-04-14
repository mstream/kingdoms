// @flow

import type {
    DatabaseSetRemove,
} from './types';
import {
    ERROR_DATABASE_SET_REMOVE,
} from './types';
import verros from 'verror';

export const remove: DatabaseSetRemove< string, string > = async ( {
    key,
    logger,
    redis,
    value,
}, ) => {

    logger.debug(
        `removing value '%s' from a set associated with the '%s' key`,
        value,
        key,
    );

    try {

        await redis.srem(
            key,
            value,
        );

    } catch ( error ) {

        throw new verros.VError(
            {
                cause: error,
                name : ERROR_DATABASE_SET_REMOVE,
            },
            `could not remove the value`,
        );

    }

};
