// @flow

import type {
    DatabaseValueCas,
} from './operations/cas/types';
import type {
    DatabaseValueGet,
} from './operations/get/types';
import type {
    DatabaseValueRemove,
} from './operations/remove/types';
import type {
    DatabaseValueSet,
} from './operations/set/types';
import type {
    KeyCreator,
    ValueDeserializer,
    ValueSerializer,
} from '../../types';

export type DatabaseValueOperations<K, V> = $ReadOnly< {|
    cas: DatabaseValueCas< K, V >,
    get: DatabaseValueGet< K, V >,
    remove: DatabaseValueRemove< K >,
    set: DatabaseValueSet< K, V >,
|} >;

export type DatabaseValueOperationsCreator<K, V> = (
    $ReadOnly< {|
        keyCreator: KeyCreator< K >,
        valueDeserializer: ValueDeserializer< V >,
        valueSerializer: ValueSerializer< V >,
    |} >,
) => DatabaseValueOperations< K, V >;
