// @flow

import {
    ERROR_DATABASE_SET_GET_ALL,
} from './types';
import verros from 'verror';
import type {
    DatabaseSetGetAll,
} from './types';

export const getAll: DatabaseSetGetAll< string, string > = async ( {
    key,
    logger,
    redis,
}, ) => {

    logger.debug(
        `getting all values from a set associated with the '%s' key`,
        key,
    );

    try {

        const values = await redis.smembers(
            key,
        );

        logger.debug(
            `retrived following values from a set associated with the '%s' key: %o`,
            key,
            values,
        );

        return values;

    } catch ( error ) {

        throw new verros.VError(
            {
                cause: error,
                name : ERROR_DATABASE_SET_GET_ALL,
            },
            `could not retrieve the values`,
        );

    }

};
