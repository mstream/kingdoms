/**
 * @flow
 */
import type { Reducer } from 'redux';
import type { ClientAction } from '../actions';

export type ClientStatePlayer = {
    name: ?string,
};

const initialState: ClientStatePlayer = {
    name: null,
};

export const playerReducer: Reducer<ClientStatePlayer, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'LOAD_PLAYER': {
            return {
                ...state,
                name: action.payload.name,
            };
        }
        default: {
            return state;
        }
    }
};
