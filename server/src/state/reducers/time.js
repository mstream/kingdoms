/**
 * @flow
 */

import type {CommonStateTime} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {initialState} from '../state';

export const timeReducer: ServerStateReducer<CommonStateTime> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return initialState.time;
        }
        case 'EXECUTE_TIME_STEP': {
            return action.payload;
        }
        default: {
            return state.time;
        }
    }
};

