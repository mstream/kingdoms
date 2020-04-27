// @flow

import type {
    DatabaseTestScenario,
} from '../../../../types';
import type {
    Logger,
} from '../../../../../../../../common/src/logging/types';
import type {
    Redis,
} from '../../../../../../clients/redis/types';


export type DatabaseValueCasResult<V> = $ReadOnly< {|
    errors: $ReadOnlyArray< string >,
    previousValue: ?V,
    savedValue: ?V,
|} >;


export type ValueTransformationResult<V> = $ReadOnly< {|
    errors: $ReadOnlyArray< string >,
    value: ?V,
|} >;


export type ValueTransformer<V> = (
    $ReadOnly< {|
        value: V,
    |} >,
) => ValueTransformationResult< V >;


export type DatabaseValueCasArgs<K, V> = $ReadOnly< {|
    key: K,
    logger: Logger,
    redis: Redis,
    valueTransformer: ValueTransformer< V >,
|} >;


export type DatabaseValueCas<K, V> = (
    DatabaseValueCasArgs< K, V >,
) => Promise< DatabaseValueCasResult< V > >;

export type DatabaseValueCasTestScenario =
    DatabaseTestScenario< DatabaseValueCasArgs< string, string >,
        DatabaseValueCasResult< string > >;
