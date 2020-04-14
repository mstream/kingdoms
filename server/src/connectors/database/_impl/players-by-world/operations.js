// @flow

import {
    createDatabaseSetOperations,
} from '../../_abstract/set';
import {
    createKey,
} from './key';
import type {
    DatabasePlayersByWorldKey,
} from './types';
import {
    stringValueDeserializer, stringValueSerializer,
} from '../../utils';

export const operations = createDatabaseSetOperations<DatabasePlayersByWorldKey,
    string,
    >(
        {
            keyCreator       : createKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
