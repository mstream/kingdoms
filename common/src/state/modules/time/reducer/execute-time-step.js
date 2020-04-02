// @flow

import type { CommonStateTime } from './types';
import type { CommonStateActionReducer } from '../../types';
import { failure, success } from '../../utils';
import { validateTime } from '../../../../validators';
import type { CommonExecuteTimeStepAction } from '../actions';
import { calculateTimeDeltaInSeconds } from '../../../../time';

type Reducer = CommonStateActionReducer<
    CommonStateTime,
    CommonExecuteTimeStepAction,
>;

export const executeTimeStepTimeReducer: Reducer = ({
    action,
    globalState,
    localState,
}) => {
    const { time } = action.payload;

    const timeValidationErrors = validateTime({ time });

    if (timeValidationErrors.length > 0) {
        return failure({ errors: timeValidationErrors });
    }

    const timeDelta = calculateTimeDeltaInSeconds({
        fromTime: globalState.time,
        toTime: time,
    });

    if (timeDelta < 0) {
        return failure({
            errors: [
                `the time from the action is not past the time from the state`,
            ],
        });
    }

    const newState = action.payload.time;
    return success({ state: newState });
};
