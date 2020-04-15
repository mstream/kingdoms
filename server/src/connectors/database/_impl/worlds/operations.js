// @flow

import {
    createDatabaseSetOperations,
} from '../../_abstract/set';
import {
    createWorldsKey,
} from './key';
import {
    stringValueDeserializer, stringValueSerializer,
} from '../../utils';
import type {
    DatabaseWorldsKey,
} from './types';

export const operations = createDatabaseSetOperations<DatabaseWorldsKey,
    string,
    >(
        {
            keyCreator       : createWorldsKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
