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

export const ERROR_DATABASE_SET_REMOVE: 'ERROR_DATABASE_SET_REMOVE'
    = `ERROR_DATABASE_SET_REMOVE`;

export type DatabaseSetRemoveResult = void

export type DatabaseSetRemoveArgs<K, V> = $ReadOnly< {|
    key: K,
    logger: Logger,
    redis: Redis,
    value: V,
|} >;

export type DatabaseSetRemove<K, V> =
    ( DatabaseSetRemoveArgs< K, V > ) => Promise< void >;

export type DatabaseSetRemoveTestScenario =
    DatabaseTestScenario< DatabaseSetRemoveArgs< string, string >,
        DatabaseSetRemoveResult >;
