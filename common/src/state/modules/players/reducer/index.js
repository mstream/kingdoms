// @flow

import {
    CREATE_CITY,
} from '../../cities/actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../orders/actions/types';
import {
    RESET_STATE,
} from '../../../actions/types';
import {
    createCityPlayersReducer,
} from './_impl/create-city';
import {
    createCommonStateReducer,
} from '../../utils';
import {
    createOrderPlayersReducer,
} from './_impl/create-order';
import {
    initialCommonState,
} from '../../../index';
import {
    resetStatePlayersReducer,
} from './_impl/reset-state';
import type {
    CommonStatePlayers,
} from './types';

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
