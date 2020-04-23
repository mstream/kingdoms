// @flow

import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../actions/types';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import {
    RESET_STATE,
} from '../../../../actions/types';
import {
    createCommonStateReducer,
} from '../../../utils';
import {
    createScheduledAttackOrderOrdersReducer,
} from './_impl/create-schduled-attack-order';
import {
    executeTimeStepOrdersReducer,
} from './_impl/execute-time-step';
import {
    initialCommonState,
} from '../../../../index';
import {
    resetStateOrdersReducer,
} from './_impl/reset-state';
import type {
    CommonStateOrders,
} from './types';

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
