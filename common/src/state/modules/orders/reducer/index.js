// @flow

import type { CommonStateOrders } from './types';
import { executeTimeStepOrdersReducer } from './execute-time-step';
import { initialCommonState } from '../../../index';
import { RESET_STATE } from '../../../actions/types';
import { CREATE_ORDER } from '../actions/types';
import { createOrderOrdersReducer } from './create-order';
import { EXECUTE_TIME_STEP } from '../../time/actions';
import { resetStateOrdersReducer } from './reset-state';
import { createCommonStateReducer } from '../../utils';


export const ordersReducer = createCommonStateReducer<CommonStateOrders>({
    actionReducers: {
        [CREATE_ORDER]: createOrderOrdersReducer,
        [EXECUTE_TIME_STEP]: executeTimeStepOrdersReducer,
        [RESET_STATE]: resetStateOrdersReducer,
    },
    initialState: initialCommonState.orders,
});
