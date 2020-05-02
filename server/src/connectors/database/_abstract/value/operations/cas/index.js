// @flow

import {
    get,
} from '../get';
import verror from 'verror';
import type {
    DatabaseValueCas,
} from './types';

export const ERROR_DATABASE_VALUE_CAS: 'ERROR_DATABASE_VALUE_CAS'
    = `ERROR_DATABASE_VALUE_CAS`;

export const cas: DatabaseValueCas< string, string > = async (
    {
        key,
        logger,
        redis,
        valueTransformer,
    },
) => {

    logger.debug(
        {
            interpolationValues: [
                key,
            ],
            message: `performing a CAS operation on value associated with the key '%s'`,
        },
    );

    try {

        logger.debug(
            {
                interpolationValues: [
                    key,
                ],
                message: `watching the '%s' key...`,
            },
        );

        await redis.watch(
            key,
        );

        try {

            const previousValue: ?string = await get(
                {
                    key,
                    logger,
                    redis,
                },
            );

            if ( previousValue == null ) {

                logger.debug(
                    {
                        interpolationValues: [
                            key,
                        ],
                        message: `unwatching the '%s' key...`,
                    },
                );

                await redis.unwatch(
                    key,
                );

                return {
                    errors: [
                        `value not initialized`,
                    ],
                    previousValue: null,
                    savedValue   : null,
                };

            }

            const valueTransformationResult = valueTransformer(
                {
                    value: previousValue,
                },
            );

            const transformationResultValue = valueTransformationResult.value;

            if (
                valueTransformationResult.errors.length > 0
                || transformationResultValue == null
            ) {

                await redis.unwatch(
                    key,
                );

                return {
                    errors    : valueTransformationResult.errors,
                    previousValue,
                    savedValue: null,
                };

            }

            const result = await redis
                .multi()
                .set(
                    key,
                    transformationResultValue,
                )
                .exec();

            const savedValue
                = result == null
                    ? null
                    : valueTransformationResult.value;

            return {
                errors: [],
                previousValue,
                savedValue,
            };

        } catch ( error ) {

            try {

                await redis.unwatch(
                    key,
                );

            } catch ( unwatchError ) {

                logger.error(
                    {
                        error              : unwatchError,
                        interpolationValues: [
                            key,
                        ],
                        message: `could not unwatch the '%s' key`,
                    },
                );

            }

            throw error;

        }

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_DATABASE_VALUE_CAS,
            },
            `could not compare and set the value`,
        );

    }

};
