// @flow

import type {CommonStateTime} from '../../../../common/src/state';
import type {CommonstateReducer} from './root';
import {success} from './root';
import {initialCommonstate} from '../state';

export const timeReducer: CommonstateReducer<CommonStateTime> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialCommonstate.time});
        }
        case 'EXECUTE_TIME_STEP': {
            return success({state: action.payload});
        }
        default: {
            return success({state: state.time});
        }
    }
};

