// @flow


import type { ClientAction } from '../../../actions';
import { loadPlayerPlayerReducer } from './load-player';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import type { ClientStatePlayer } from './types';
import { LOAD_PLAYER } from '../actions';
import type { ClientState } from '../../types';

export const initialPlayerState = {
    name: null,
};

export const playerReducer = (
    localState: ClientStatePlayer = initialPlayerState,
    action: ClientAction,
    globalState: ClientState,
): ClientStatePlayer => {
    switch (action.type) {
        case LOAD_PLAYER: {
            return loadPlayerPlayerReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};
