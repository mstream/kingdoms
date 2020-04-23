// @flow

import {
    emptyCitiesState,
} from './_children/cities/reducer/state';
import {
    emptyOrdersState,
} from './_children/orders/reducer/state';
import {
    emptyPlayersState,
} from './_children/players/reducer/state';
import {
    emptyRulesState,
} from './_children/rules/reducer/state';
import {
    emptyTimeState,
} from './_children/time/reducer/state';
import {
    emptyWorldState,
} from './_children/world/reducer/state';
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
