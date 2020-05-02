// @flow

import {
    ERROR_DATABASE_SET_GET_ALL,
} from './types';
import verros from 'verror';
import type {
    DatabaseSetGetAll,
} from './types';

export const getAll: DatabaseSetGetAll< string, string > = async (
    {
        key,
        logger,
        redis,
    },
) => {

    logger.debug(
        {
            interpolationValues: [
                key,
            ],
            message: `getting all values from a set associated with the '%s' key`,
        },
    );

    try {

        const values = await redis.smembers(
            key,
        );

        logger.debug(
            {
                interpolationValues: [
                    key,
                    values,
                ],
                message: `retrieved following values `
                    + ` from a set associated with the '%s' key: %o`,
            },
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
