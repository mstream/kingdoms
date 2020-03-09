// @flow

import type {CommonStateRules} from '../../../../common/src/state';
import type {CommonStateReducer} from './root';
import {success} from './root';
import {initialCommonState} from '../state';

export const rulesReducer: CommonStateReducer<CommonStateRules> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialCommonState.rules});
        }
        default: {
            return success({state: state.rules});
        }
    }
};

