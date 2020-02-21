/**
 * @flow
 */

import type {Reducer} from 'redux';
import type {ServerState} from '../../../../common/src/state';
import {initialState} from './state';
import type {ServerAction} from '../../../../common/src/actions';

export const timeReducer: Reducer<ServerState, ServerAction> = (state = initialState, action: ServerAction) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return initialState;
        }
        case 'EXECUTE_TIME_STEP': {
            const newTimeState = action.payload;
            return {
                ...state,
                time: newTimeState
            };
        }
        default: {
            return state;
        }
    }
};

