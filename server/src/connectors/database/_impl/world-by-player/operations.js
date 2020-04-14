// @flow

import {
    stringValueDeserializer, stringValueSerializer,
} from '../../utils';
import type {
    DatabaseWorldByPlayerKey,
} from './types';
import {
    createKey,
} from './key';
import {
    createDatabaseValueOperations,
} from '../../_abstract/value';

export const operations = createDatabaseValueOperations<DatabaseWorldByPlayerKey,
    string,
    >(
        {
            keyCreator       : createKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
