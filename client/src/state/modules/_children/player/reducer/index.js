// @flow

import {
    loadPlayerPlayerReducer,
} from './_impl/load-player';
import {
    LOAD_PLAYER,
} from '../actions/types';
import {
    createClientStateReducer,
} from '../../../../utils';
import {
    initialClientState,
} from '../../../../state';
import type {
    ClientStatePlayer,
} from './types';

export const playerReducer = createClientStateReducer<ClientStatePlayer>(
    {
        actionReducers: {
            [ LOAD_PLAYER ]: loadPlayerPlayerReducer,
        },
        initialState: initialClientState.player,
    },
);
