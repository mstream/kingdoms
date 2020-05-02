// @flow

import verror from 'verror';
import type {
    DatabaseValueGet,
} from './types';

export const ERROR_DATABASE_VALUE_GET: 'DATABASE_VALUE_GET'
    = `DATABASE_VALUE_GET`;

export const get: DatabaseValueGet< string, string > = async ( {
    key,
    logger,
    redis,
}, ) => {

    try {

        logger.debug(
            {
                interpolationValues:  [
                    key,
                ],
                message: `getting a value associated with the '%s' key`,
            },
        );


        return await redis.get(
            key,
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_DATABASE_VALUE_GET,
            },
            `could not retrieve the value`,
        );

    }

};
