// @flow

import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../actions/types';
import {
    DUMMY,
} from '../../../../../../../client/src/pages/world/state/modules/actions/types';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import {
    RESET_STATE,
} from '../../../../actions/types';
import {
    createScheduledAttackOrderTestScenarios,
} from './_test/create-scheduled-attack-order-test-scenarios';
import {
    dummy,
} from '../../../../actions';
import {
    emptyCommonState,
} from '../../../state';
import {
    executeTimeStepTestScenarios,
} from './_test/execute-time-step-test-scenarios';
import {
    initialCommonState,
} from '../../../../index';
import {
    ordersReducer,
} from './index';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../../test-utils';
import {
    success,
} from '../../../utils';
import type {
    CommonDummyAction,
} from '../../../../actions/types';
import type {
    CommonStateOrdersReducerTestScenarios,
} from './_test/types';

type StateInitializationScenario =
    CommonStateOrdersReducerTestScenarios< CommonDummyAction >;


const stateInitializationScenario: StateInitializationScenario = {
    action                        : dummy(),
    expectedReductionResultCreator: () => {

        return success(
            {
                state: initialCommonState.orders,
            },
        );

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyCommonState,

        // $FlowFixMe
        time: undefined,
    },
};

const scenarios = {
    [ CREATE_SCHEDULED_ATTACK_ORDER ]: createScheduledAttackOrderTestScenarios,
    [ DUMMY ]                        : [
        stateInitializationScenario,
    ],
    [ EXECUTE_TIME_STEP ]: executeTimeStepTestScenarios,
    [ RESET_STATE ]      : resetStateTestScenarios,
};

describe(
    `ordersReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : ordersReducer,
                reducerKey: `orders`,
                scenarios,
            },
        );

    },
);
