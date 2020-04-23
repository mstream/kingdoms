// @flow

import {
    commonStateSelectors,
} from '../../../../selectors';
import {
    failure, success,
} from '../../../../utils';
import {
    validateTime,
} from '../../../../../../validators';
import type {
    CommonExecuteTimeStepAction,
} from '../../actions';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateTime,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateTime,
    CommonExecuteTimeStepAction, >;

export const executeTimeStepTimeReducer: Reducer = (
    {
        action,
        globalState,
    },
) => {

    const {
        time,
    } = action.payload;

    const timeValidationErrors = validateTime(
        {
            time,
        },
    );

    if ( timeValidationErrors.length > 0 ) {

        return failure(
            {
                errors: timeValidationErrors,
            },
        );

    }

    const realTimeDeltaInSeconds = commonStateSelectors.time.timeDeltaInSeconds(
        globalState,
        {
            time: action.payload.time,
        },
    );

    if ( realTimeDeltaInSeconds < 0 ) {

        return failure(
            {
                errors: [
                    `the time from the action is not past the time from the state`,
                ],
            },
        );

    }

    const newState = action.payload.time;

    return success(
        {
            state: newState,
        },
    );

};
