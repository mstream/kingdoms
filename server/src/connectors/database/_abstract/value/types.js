// @flow

import type {
    KeyCreator,
    ValueDeserializer,
    ValueSerializer,
} from '../../types';
import type {
    DatabaseValueCas,
} from './operations/cas/types';
import type {
    DatabaseValueSet,
} from './operations/set/types';
import type {
    DatabaseValueGet,
} from './operations/get/types';

export type DatabaseValueOperations<K, V> = $ReadOnly< {|
    cas: DatabaseValueCas< K, V >,
    get: DatabaseValueGet< K, V >,
    set: DatabaseValueSet< K, V >,
|} >;

export type DatabaseValueOperationsCreator<K, V> = (
    $ReadOnly< {|
        keyCreator: KeyCreator< K >,
        valueDeserializer: ValueDeserializer< V >,
        valueSerializer: ValueSerializer< V >,
    |} >,
) => DatabaseValueOperations< K, V >;
