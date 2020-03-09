// @flow
import type {ClientAction} from '../actions';
import {UPDATE_STATE} from '../actions';
import type {CommonState} from '../../../../common/src/state';
import type {ClientState} from '../state';
import {initialClientState} from '../state';

export const commonStateReducer = (
    localState: ?CommonState = initialClientState.commonState,
    action: ClientAction,
    globalState: ClientState,
): ?CommonState => {
    switch (action.type) {
        case UPDATE_STATE: {
            return action.payload.commonState;
        }
        default: {
            return localState;
        }
    }
};
