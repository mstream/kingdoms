// @flow

import {
    emptyCitiesState,
} from './cities/reducer/state';
import {
    emptyOrdersState,
} from './orders/reducer/state';
import {
    emptyPlayersState,
} from './players/reducer/state';
import {
    emptyRulesState,
} from './rules/reducer/state';
import {
    emptyTimeState,
} from './time/reducer/state';
import {
    emptyWorldState,
} from './world/reducer/state';
import type {
    CommonState,
} from './types';

export const emptyCommonState: CommonState = {
    cities : emptyCitiesState,
    orders : emptyOrdersState,
    players: emptyPlayersState,
    rules  : emptyRulesState,
    time   : emptyTimeState,
    world  : emptyWorldState,
};
