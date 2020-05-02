// @flow

import verror from 'verror';
import type {
    DatabaseValueRemove,
} from './types';

export const ERROR_DATABASE_VALUE_REMOVE: 'ERROR_DATABASE_VALUE_REMOVE'
    = `ERROR_DATABASE_VALUE_REMOVE`;

export const remove: DatabaseValueRemove< string > = async ( {
    key,
    logger,
    redis,
}, ) => {

    try {

        logger.debug(
            {
                interpolationValues: [
                    key,
                ],
                message: `removing a value associated with the '%s' key`,
            },
        );


        await redis.del(
            key,
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_DATABASE_VALUE_REMOVE,
            },
            `could not remove the value`,
        );

    }

};
