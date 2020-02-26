/**
 * @flow
 */

import type {CommonStateRules} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {success} from './root';
import {initialState} from '../state';

export const rulesReducer: ServerStateReducer<CommonStateRules> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialState.rules});
        }
        default: {
            return success({state: state.rules});
        }
    }
};

