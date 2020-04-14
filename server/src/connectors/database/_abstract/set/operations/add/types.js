// @flow

import type {
    Redis,
} from '../../../../../../clients/redis/types';
import type {
    DatabaseTestScenario,
} from '../../../../types';
import type {
    Logger,
} from '../../../../../../../../common/src/logging/types';

export const ERROR_DATABASE_SET_ADD: 'DATABASE_SET_ADD'
    = `DATABASE_SET_ADD`;

export type DatabaseSetAddResult = void

export type DatabaseSetAddArgs<K, V> = $ReadOnly< {|
    key: K,
    logger: Logger,
    redis: Redis,
    value: V,
|} >;

export type DatabaseSetAdd<K, V> = ( DatabaseSetAddArgs< K, V > ) => Promise< DatabaseSetAddResult >;

export type DatabaseSetAddTestScenario =
    DatabaseTestScenario< DatabaseSetAddArgs< string, string >, DatabaseSetAddResult >;
