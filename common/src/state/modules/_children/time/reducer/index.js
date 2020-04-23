// @flow

import {
    EXECUTE_TIME_STEP,
} from '../actions';
import {
    RESET_STATE,
} from '../../../../actions/types';
import {
    createCommonStateReducer,
} from '../../../utils';
import {
    executeTimeStepTimeReducer,
} from './_impl/execute-time-step';
import {
    initialCommonState,
} from '../../../../index';
import {
    resetStateTimeReducer,
} from './_impl/reset-state';
import type {
    CommonStateTime,
} from './types';

export const timeReducer = createCommonStateReducer<CommonStateTime>(
    {
        actionReducers: {
            [ EXECUTE_TIME_STEP ]: executeTimeStepTimeReducer,
            [ RESET_STATE ]      : resetStateTimeReducer,
        },
        initialState: initialCommonState.time,
    },
);
