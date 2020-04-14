// @flow

import type {
    DatabaseTestScenario,
} from '../../../../types';
import type {
    Redis,
} from '../../../../../../clients/redis/types';
import type {
    Logger,
} from '../../../../../../../../common/src/logging/types';

export type DatabaseValueGetResult<V> = ?V;

export type DatabaseValueGetArgs<K> = $ReadOnly< {|
    key: K,
    logger: Logger,
    redis: Redis,
|} >;

export type DatabaseValueGet<K, V> = ( DatabaseValueGetArgs< K > ) => Promise< DatabaseValueGetResult< V > >;

export type DatabaseValueGetTestScenario =
    DatabaseTestScenario< DatabaseValueGetArgs< string >, DatabaseValueGetResult< string > >;

