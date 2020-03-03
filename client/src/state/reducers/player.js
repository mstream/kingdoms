// @flow

import type {ClientAction} from '../actions';
import type {ClientState, ClientStatePlayer} from '../state';
import {initialClientState} from '../state';

export const playerReducer = (
    localState: ClientStatePlayer = initialClientState.player,
    action: ClientAction,
    globalState: ClientState,
): ClientStatePlayer => {
    switch (action.type) {
        case 'LOAD_PLAYER': {
            return {
                ...localState,
                name: action.payload.name,
            };
        }
        default: {
            return localState;
        }
    }
};
