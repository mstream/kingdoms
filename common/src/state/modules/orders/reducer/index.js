// @flow

import type { CommonStateOrders } from './types';
import { resetStateOrdersReducer } from './reset-state';
import { executeTimeStepOrdersReducer } from './execute-time-step';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import { initialCommonState } from '../../../index';
import type { CommonState, CommonStateReducerResult } from '../../types';
import { RESET_STATE } from '../../../actions/types';
import { CREATE_ORDER } from '../actions/types';
import { createOrderOrdersReducer } from './create-order';
import { EXECUTE_TIME_STEP } from '../../time/actions';
import type { CommonAction } from '../../../types';

export const ordersReducer = (
    localState: CommonStateOrders = initialCommonState.orders,
    action: CommonAction,
    globalState: CommonState,
): CommonStateReducerResult<CommonStateOrders> => {
    switch (action.type) {
        case CREATE_ORDER: {
            return createOrderOrdersReducer({
                action,
                globalState,
                localState,
            });
        }
        case RESET_STATE: {
            return resetStateOrdersReducer({
                action,
                globalState,
                localState,
            });
        }
        case EXECUTE_TIME_STEP: {
            return executeTimeStepOrdersReducer({
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

