// @flow

import {
    FAIL_WORLDS_UPDATE,
    REQUEST_WORLDS_UPDATE,
    SUCCEED_WORLDS_UPDATE,
} from '../actions/types';
import {
    createClientStateReducer,
} from '../../../../utils';
import {
    failWorldsUpdateReducer,
} from './_impl/fail-worlds-update';
import {
    initialClientState,
} from '../../../../state';
import {
    requestWorldsUpdateReducer,
} from './_impl/request-worlds-update';
import {
    succeedWorldsUpdateReducer,
} from './_impl/succeed-worlds-update';
import type {
    ClientStateWorlds,
} from './types';

export const worldsReducer = createClientStateReducer<ClientStateWorlds>(
    {
        actionReducers: {
            [ FAIL_WORLDS_UPDATE ]   : failWorldsUpdateReducer,
            [ REQUEST_WORLDS_UPDATE ]: requestWorldsUpdateReducer,
            [ SUCCEED_WORLDS_UPDATE ]: succeedWorldsUpdateReducer,
        },
        initialState: initialClientState.worlds,
    },
);
