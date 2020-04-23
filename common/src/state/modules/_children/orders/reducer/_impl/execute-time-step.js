// @flow


import {
    commonStateSelectors,
} from '../../../../selectors';
import {
    failure, success,
} from '../../../../utils';
import type {
    CommonExecuteTimeStepAction,
} from '../../../time/actions';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateOrders,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateOrders,
    CommonExecuteTimeStepAction, >;

export const executeTimeStepOrdersReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {

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

    return success(
        {
            state: localState,
        },
    );

};
