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
    DatabaseWorldByPlayerKey,
} from './types';

export const operations = createDatabaseValueOperations<DatabaseWorldByPlayerKey,
    string,
    >(
        {
            keyCreator       : createKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
