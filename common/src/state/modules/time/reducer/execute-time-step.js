// @flow

import type { CommonStateTime } from './types';
import { calculateTimeDelta } from '../../../../util';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { failure, success } from '../../utils';
import type { CommonExecuteTimeStepAction } from '../actions';

export const executeTimeStepTimeReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonExecuteTimeStepAction,
        globalState: CommonState,
        localState: CommonStateTime,
    },
): CommonStateReducerResult<CommonStateTime> => {
    const timeDelta = calculateTimeDelta({
        fromTime: globalState.time,
        toTime: action.payload.time,
    });

    if (timeDelta < 0) {
        return failure({ errors: [`the time from the action is not past the time from the state`] });
    }


    const newState = action.payload.time;
    return success({ state: newState });
};


