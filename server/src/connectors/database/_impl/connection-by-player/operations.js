// @flow

import {
    stringValueDeserializer, stringValueSerializer,
} from '../../utils';
import type {
    DatabaseConnectionByPlayerKey,
} from './types';
import {
    createKey,
} from './key';
import {
    createDatabaseValueOperations,
} from '../../_abstract/value';

export const operations = createDatabaseValueOperations<DatabaseConnectionByPlayerKey,
    string,
    >(
        {
            keyCreator       : createKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
