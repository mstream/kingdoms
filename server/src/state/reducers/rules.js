/**
 * @flow
 */

import type {CommonStateRules} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {initialState} from '../state';

export const rulesReducer: ServerStateReducer<CommonStateRules> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return initialState.rules;
        }
        default: {
            return state.rules;
        }
    }
};

