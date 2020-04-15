// @flow

import {
    connectionByPlayerOperations,
} from './_impl/connection-by-player';
import {
    playersByWorldOperations,
} from './_impl/players-by-world';
import {
    statesByWorldOperations,
} from './_impl/state-by-world';
import {
    worldByPlayerOperations,
} from './_impl/world-by-player';
import {
    worldsOperations,
} from './_impl/worlds';

export const database = {
    connectionByPlayer: connectionByPlayerOperations,
    playersByWorld    : playersByWorldOperations,
    stateByWorld      : statesByWorldOperations,
    worldByPlayer     : worldByPlayerOperations,
    worlds            : worldsOperations,
};
