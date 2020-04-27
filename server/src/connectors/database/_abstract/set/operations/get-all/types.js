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

export const ERROR_DATABASE_SET_GET_ALL: 'ERROR_DATABASE_SET_GET_ALL'
    = `ERROR_DATABASE_SET_GET_ALL`;

export type DatabaseSetGetAllResult<V> = $ReadOnlyArray< V >

export type DatabaseSetGetAllArgs<K> = $ReadOnly< {|
    key: K,
    logger: Logger,
    redis: Redis,
|} >;

export type DatabaseSetGetAll<K, V> = ( DatabaseSetGetAllArgs< K > ) =>
    Promise< $ReadOnlyArray< V >, >;

export type DatabaseSetGetAllTestScenario =
    DatabaseTestScenario< DatabaseSetGetAllArgs< string >, DatabaseSetGetAllResult< string > >;
