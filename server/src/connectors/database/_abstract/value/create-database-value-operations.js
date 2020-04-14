// @flow

import type {
    DatabaseValueOperations,
} from './types';

import {
    cas,
} from './operations/cas';
import {
    get,
} from './operations/get';
import {
    set,
} from './operations/set';
import type {
    KeyCreator,
    ValueDeserializer,
    ValueSerializer,
} from '../../types';
import type {
    DatabaseValueCas,
    DatabaseValueCasResult,
    ValueTransformationResult,
    ValueTransformer,
} from './operations/cas/types';
import type {
    DatabaseValueGet,
} from './operations/get/types';
import type {
    DatabaseValueSet,
} from './operations/set/types';

export const createDatabaseValueOperations = <K, V>( {
    keyCreator,
    valueDeserializer,
    valueSerializer,
}: {
    keyCreator: KeyCreator< K >,
    valueDeserializer: ValueDeserializer< V >,
    valueSerializer: ValueSerializer< V >,
}, ): DatabaseValueOperations< K, V > => {

    const specializedCas: DatabaseValueCas< K, V > = async ( {
        key,
        logger,
        redis,
        valueTransformer,
    }, ) => {

        const serializedKey = keyCreator(
            {
                key,
            },
        );

        const stringValueTransformer: ValueTransformer< string > = (
            {
                value,
            },
        ) => {

            const deserializedValue: V = valueDeserializer(
                {
                    serializedValue: value,
                },
            );

            const transformedValueResult: ValueTransformationResult< V > = valueTransformer(
                {
                    value: deserializedValue,
                },
            );

            if (
                transformedValueResult.errors.length > 0
                || transformedValueResult.value == null
            ) {

                return {
                    errors: transformedValueResult.errors,
                    value : null,
                };

            }

            const serializedValue: string = valueSerializer(
                {
                    value: transformedValueResult.value,
                },
            );

            return {
                errors: [],
                value : serializedValue,
            };

        };

        const casResult: DatabaseValueCasResult< string > = await cas(
            {
                key             : serializedKey,
                logger,
                redis,
                valueTransformer: stringValueTransformer,
            },
        );

        return {
            errors: casResult.errors,

            previousValue:
                casResult.previousValue == null
                    ? null
                    : valueDeserializer(
                        {
                            serializedValue: casResult.previousValue,
                        },
                    ),

            savedValue:
                casResult.savedValue == null
                    ? null
                    : valueDeserializer(
                        {
                            serializedValue: casResult.savedValue,
                        },
                    ),
        };

    };

    const specializedGet: DatabaseValueGet< K, V > = async ( {
        key,
        logger,
        redis,
    }, ) => {

        const serializedKey = keyCreator(
            {
                key,
            },
        );

        const serializedValue = await get(
            {
                key: serializedKey,
                logger,
                redis,
            },
        );

        if ( serializedValue == null ) {

            return null;

        }

        return valueDeserializer(
            {
                serializedValue,
            },
        );

    };

    const specializedSet: DatabaseValueSet< K, V > = async ( {
        key,
        logger,
        redis,
        value,
    }, ) => {

        const serializedKey = keyCreator(
            {
                key,
            },
        );

        const serializedValue = valueSerializer(
            {
                value,
            },
        );

        return await set(
            {
                key  : serializedKey,
                logger,
                redis,
                value: serializedValue,
            },
        );

    };

    return {
        cas: specializedCas,
        get: specializedGet,
        set: specializedSet,
    };

};
