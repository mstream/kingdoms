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

export type DatabaseValueRemoveResult = void;

export type DatabaseValueRemoveArgs<K> = $ReadOnly< {|
    key: K,
    logger: Logger,
    redis: Redis,
|} >;

export type DatabaseValueRemove<K> =
    ( DatabaseValueRemoveArgs< K > ) => Promise< DatabaseValueRemoveResult >;

export type DatabaseValueRemoveTestScenario =
    DatabaseTestScenario< DatabaseValueRemoveArgs< string >,
        DatabaseValueRemoveResult >;

