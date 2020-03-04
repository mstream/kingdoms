// @flow
import type {ClientAction} from '../actions';
import {UPDATE_STATE} from '../actions';
import type {ServerState} from '../../../../common/src/state';
import type {ClientState} from '../state';
import {initialClientState} from '../state';

export const serverStateReducer = (
    localState: ?ServerState = initialClientState.serverState,
    action: ClientAction,
    globalState: ClientState,
): ?ServerState => {
    switch (action.type) {
        case UPDATE_STATE: {
            return action.payload.serverState;
        }
        default: {
            return localState;
        }
    }
};
