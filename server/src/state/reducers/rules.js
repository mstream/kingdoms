// @flow

import type {CommonStateRules} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {success} from './root';
import {initialServerState} from '../state';

export const rulesReducer: ServerStateReducer<CommonStateRules> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialServerState.rules});
        }
        default: {
            return success({state: state.rules});
        }
    }
};

