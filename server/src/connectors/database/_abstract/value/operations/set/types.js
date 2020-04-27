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

export type DatabaseValueSetResult = void

export type DatabaseValueSetArgs<K, V> = $ReadOnly< {|
    key: K,
    logger: Logger,
    redis: Redis,
    value: V,
|} >;

export type DatabaseValueSet<K, V> = ( DatabaseValueSetArgs< K, V > ) =>
    Promise< DatabaseValueSetResult >;

export type DatabaseValueSetTestScenario =
    DatabaseTestScenario< DatabaseValueSetArgs< string, string >, DatabaseValueSetResult >;
