// @flow

import {
    createDatabaseSetOperations,
} from '../../_abstract/set';
import {
    createWorldsKey,
} from './key';
import type {
    DatabaseWorldsKey,
} from './types';
import {
    stringValueDeserializer, stringValueSerializer,
} from '../../utils';

export const operations = createDatabaseSetOperations<DatabaseWorldsKey,
    string,
    >(
        {
            keyCreator       : createWorldsKey,
            valueDeserializer: stringValueDeserializer,
            valueSerializer  : stringValueSerializer,
        },
    );
