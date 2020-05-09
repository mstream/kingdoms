// @flow

import {
    emptyErrorsState,
    initialErrorsState,
} from './modules/_children/errors/reducer/state';
import {
    emptyPlayerState,
    initialPlayerState,
} from './modules/_children/player/reducer/state';
import {
    emptyWorldsState,
    initialWorldsState,
} from './modules/_children/worlds/reducer/state';
import type {
    ClientState,
} from './types';

export const initialClientState = {
    errors: initialErrorsState,
    player: initialPlayerState,
    worlds: initialWorldsState,
};

export const emptyClientState: ClientState = {
    errors: emptyErrorsState,
    player: emptyPlayerState,
    worlds: emptyWorldsState,
};
