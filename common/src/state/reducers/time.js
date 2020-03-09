// @flow

import type {CommonStateTime} from '../../../../common/src/state';
import type {CommonStateReducer} from './root';
import {success} from './root';
import {initialCommonState} from '../state';

export const timeReducer: CommonStateReducer<CommonStateTime> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialCommonState.time});
        }
        case 'EXECUTE_TIME_STEP': {
            return success({state: action.payload});
        }
        default: {
            return success({state: state.time});
        }
    }
};

