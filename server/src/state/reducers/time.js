/**
 * @flow
 */

import type {Reducer} from 'redux';
import type {ServerAction} from '../actions';
import type {ServerState} from '../../../../common/src/state';
import {initialState} from './state';

export const timeReducer: Reducer<ServerState, ServerAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'STATE_RESET': {
            return initialState;
        }
        case 'STATE_UPDATED': {
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

