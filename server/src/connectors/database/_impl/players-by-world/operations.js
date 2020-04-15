// @flow

import {
    createDatabaseSetOperations,
} from '../../_abstract/set';
import {
    createKey,
} from './key';
import {
    stringValueDeserializer, stringValueSerializer,
} from '../../utils';
import type {
    DatabasePlayersByWorldKey,
} from './types';

export const operations = createDatabaseSetOperations<DatabasePlayersByWorldKey,
    string,
    >(
        {
            keyCreator       : createKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
