// @flow

import type { CommonStateTime } from './types';
import { resetStateTimeReducer } from './reset-state';
import { executeTimeStepTimeReducer } from './execute-time-step';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import { initialCommonState } from '../../../index';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { EXECUTE_TIME_STEP } from '../actions';
import type { CommonAction } from '../../../actions/types';
import { RESET_STATE } from '../../../actions/types';

export const timeReducer = (
    localState: CommonStateTime = initialCommonState.time,
    action: CommonAction,
    globalState: CommonState,
): CommonStateReducerResult<CommonStateTime> => {
    switch (action.type) {
        case RESET_STATE: {
            return resetStateTimeReducer({
                action,
                globalState,
                localState,
            });
        }
        case EXECUTE_TIME_STEP: {
            return executeTimeStepTimeReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};

