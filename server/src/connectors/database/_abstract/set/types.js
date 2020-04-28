// @flow

import type {
    DatabaseSetAdd,
} from './operations/add/types';
import type {
    DatabaseSetGetAll,
} from './operations/get-all/types';
import type {
    DatabaseSetRemove,
} from './operations/remove/types';
import type {
    KeyCreator,
    ValueDeserializer,
    ValueSerializer,
} from '../../types';

export type DatabaseSetOperations<K, V> = $ReadOnly< {|
    add: DatabaseSetAdd< K, V >,
    getAll: DatabaseSetGetAll< K, V >,
    remove: DatabaseSetRemove< K, V >,
|} >;

export type DatabaseSetOperationsCreator<K, V> = (
    {
        keyCreator: KeyCreator< K >,
        valueDeserializer: ValueDeserializer< V >,
        valueSerializer: ValueSerializer< V >,
    },
) => DatabaseSetOperations< K, V >;
