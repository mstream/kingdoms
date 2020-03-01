// @flow
import type {Reducer} from 'redux';
import type {ClientAction} from '../actions';
import type {ServerState} from '../../../../common/src/state';

const initialState: ?ServerState = null;

export const serverStateReducer: Reducer<?ServerState, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'UPDATE_STATE': {
            return action.payload.serverState;
        }
        default: {
            return state;
        }
    }
};
