// @flow

import { calculateTimeDelta } from '../../../../util';
import type { CommonState, CommonStateReducerResult } from '../../types';
import { failure, success } from '../../utils';
import type { CommonExecuteTimeStepAction } from '../../time/actions';
import type { CommonStateOrders } from './types';

export const executeTimeStepOrdersReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonExecuteTimeStepAction,
        globalState: CommonState,
        localState: CommonStateOrders,
    },
): CommonStateReducerResult<CommonStateOrders> => {
    const timeDelta = calculateTimeDelta({
        fromTime: globalState.time,
        toTime: action.payload.time,
    });

    if (timeDelta < 0) {
        return failure({ errors: [`the time from the action is not past the time from the state`] });
    }


    const newState = localState;
    return success({ state: newState });
};


