// @flow

import {
    createDatabaseValueOperations,
} from '../../_abstract/value';
import {
    createKey,
} from './key';
import {
    stringValueDeserializer, stringValueSerializer,
} from '../../utils';
import type {
    DatabaseConnectionByPlayerKey,
} from './types';

export const operations = createDatabaseValueOperations<DatabaseConnectionByPlayerKey,
    string,
    >(
        {
            keyCreator       : createKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
