// @flow

import type {
    CommonStateOrders,
} from './types';
import {
    executeTimeStepOrdersReducer,
} from './_impl/execute-time-step';
import {
    initialCommonState,
} from '../../../index';
import {
    RESET_STATE,
} from '../../../actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../actions/types';
import {
    createScheduledAttackOrderOrdersReducer,
} from './_impl/create-schduled-attack-order';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import {
    resetStateOrdersReducer,
} from './_impl/reset-state';
import {
    createCommonStateReducer,
} from '../../utils';

export const ordersReducer = createCommonStateReducer<CommonStateOrders>(
    {
        actionReducers: {
            [ CREATE_SCHEDULED_ATTACK_ORDER ]: createScheduledAttackOrderOrdersReducer,
            [ EXECUTE_TIME_STEP ]            : executeTimeStepOrdersReducer,
            [ RESET_STATE ]                  : resetStateOrdersReducer,
        },
        initialState: initialCommonState.orders,
    },
);
