// @flow

import { resetStateTimeReducer } from './reset-state';
import { executeTimeStepTimeReducer } from './execute-time-step';
import { initialCommonState } from '../../../index';
import { EXECUTE_TIME_STEP } from '../actions';
import { RESET_STATE } from '../../../actions/types';
import { createCommonStateReducer } from '../../utils';
import type { CommonStateTime } from './types';

export const timeReducer = createCommonStateReducer<CommonStateTime>({
    actionReducers: {
        [EXECUTE_TIME_STEP]: executeTimeStepTimeReducer,
        [RESET_STATE]: resetStateTimeReducer,
    },
    initialState: initialCommonState.time,
});
