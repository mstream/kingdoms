// @flow

import type {
    CommonState,
} from './types';
import {
    emptyTimeState,
} from './time/reducer/state';
import {
    emptyWorldState,
} from './world/reducer/state';
import {
    emptyRulesState,
} from './rules/reducer/state';
import {
    emptyCitiesState,
} from './cities/reducer/state';
import {
    emptyOrdersState,
} from './orders/reducer/state';
import {
    emptyPlayersState,
} from './players/reducer/state';

export const emptyCommonState: CommonState = {
    cities : emptyCitiesState,
    orders : emptyOrdersState,
    players: emptyPlayersState,
    rules  : emptyRulesState,
    time   : emptyTimeState,
    world  : emptyWorldState,
};
