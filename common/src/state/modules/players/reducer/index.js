// @flow

import type {
    CommonStatePlayers,
} from './types';
import {
    createCityPlayersReducer,
} from './_impl/create-city';
import {
    initialCommonState,
} from '../../../index';
import {
    RESET_STATE,
} from '../../../actions/types';
import {
    CREATE_CITY,
} from '../../cities/actions/types';
import {
    resetStatePlayersReducer,
} from './_impl/reset-state';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../orders/actions/types';
import {
    createOrderPlayersReducer,
} from './_impl/create-order';
import {
    createCommonStateReducer,
} from '../../utils';

export const playersReducer = createCommonStateReducer<CommonStatePlayers>(
    {
        actionReducers: {
            [ CREATE_CITY ]                  : createCityPlayersReducer,
            [ CREATE_SCHEDULED_ATTACK_ORDER ]: createOrderPlayersReducer,
            [ RESET_STATE ]                  : resetStatePlayersReducer,
        },
        initialState: initialCommonState.players,
    },
);
