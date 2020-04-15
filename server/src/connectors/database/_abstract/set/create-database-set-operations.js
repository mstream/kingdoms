// @flow

import {
    add,
} from './operations/add';
import {
    getAll,
} from './operations/get-all';
import {
    remove,
} from './operations/remove';
import type {
    DatabaseSetAdd,
} from './operations/add/types';
import type {
    DatabaseSetGetAll,
} from './operations/get-all/types';
import type {
    DatabaseSetOperations,
} from './types';
import type {
    DatabaseSetRemove,
} from './operations/remove/types';
import type {
    KeyCreator,
    ValueDeserializer,
    ValueSerializer,
} from '../../types';

export const createDatabaseSetOperations = <K, V>( {
    keyCreator,
    valueDeserializer,
    valueSerializer,
}: {
    keyCreator: KeyCreator< K >,
    valueDeserializer: ValueDeserializer< V >,
    valueSerializer: ValueSerializer< V >,
}, ): DatabaseSetOperations< K, V > => {

    const specializedAdd: DatabaseSetAdd< K, V > = async ( {
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

        return await add(
            {
                key  : serializedKey,
                logger,
                redis,
                value: serializedValue,
            },
        );

    };

    const specializedGetAll: DatabaseSetGetAll< K, V > = async ( {
        key,
        logger,
        redis,
    }, ) => {

        const serializedKey = keyCreator(
            {
                key,
            },
        );

        const serializedValues = await getAll(
            {
                key: serializedKey,
                logger,
                redis,
            },
        );

        return serializedValues.map(
            (
                serializedValue: string,
            ) => {

                return valueDeserializer(
                    {
                        serializedValue,
                    },
                );

            },
        );

    };

    const specializedRemove: DatabaseSetRemove< K, V > = async ( {
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

        return await remove(
            {
                key  : serializedKey,
                logger,
                redis,
                value: serializedValue,
            },
        );

    };

    return {
        add   : specializedAdd,
        getAll: specializedGetAll,
        remove: specializedRemove,
    };

};
