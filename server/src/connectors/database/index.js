// @flow

import {
    playersByWorldOperations,
} from './_impl/players-by-world';
import {
    worldsOperations,
} from './_impl/worlds';
import {
    statesByWorldOperations,
} from './_impl/state-by-world';
import {
    connectionByPlayerOperations,
} from './_impl/connection-by-player';
import {
    worldByPlayerOperations,
} from './_impl/world-by-player';

export const database = {
    connectionByPlayer: connectionByPlayerOperations,
    playersByWorld    : playersByWorldOperations,
    stateByWorld      : statesByWorldOperations,
    worldByPlayer     : worldByPlayerOperations,
    worlds            : worldsOperations,
};
