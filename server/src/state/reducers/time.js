// @flow

import type {CommonStateTime} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {success} from './root';
import {initialServerState} from '../state';

export const timeReducer: ServerStateReducer<CommonStateTime> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialServerState.time});
        }
        case 'EXECUTE_TIME_STEP': {
            return success({state: action.payload});
        }
        default: {
            return success({state: state.time});
        }
    }
};

