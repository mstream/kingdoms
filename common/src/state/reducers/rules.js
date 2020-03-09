// @flow

import type {CommonStateRules} from '../../../../common/src/state';
import type {CommonstateReducer} from './root';
import {success} from './root';
import {initialCommonstate} from '../state';

export const rulesReducer: CommonstateReducer<CommonStateRules> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialCommonstate.rules});
        }
        default: {
            return success({state: state.rules});
        }
    }
};

