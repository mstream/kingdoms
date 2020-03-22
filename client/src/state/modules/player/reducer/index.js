// @flow


import { loadPlayerPlayerReducer } from './load-player';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import type { ClientStatePlayer } from './types';
import type { ClientState } from '../../types';
import type { ClientAction } from '../../../types';
import { LOAD_PLAYER } from '../actions/types';
import { initialPlayerState } from './state';

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
