// @flow

import {
    ERROR_DATABASE_SET_REMOVE,
} from './types';
import verros from 'verror';
import type {
    DatabaseSetRemove,
} from './types';

export const remove: DatabaseSetRemove< string, string > = async (
    {
        key,
        logger,
        redis,
        value,
    },
) => {

    logger.debug(
        {
            interpolationValues: [
                value,
                key,
            ],
            message: `removing value '%s' from a set associated with the '%s' key`,
        },
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
