// @flow

import {
    initialCommonState,
} from '../../../index';
import {
    success,
} from '../../utils';
import {
    emptyCommonState,
} from '../../state';
import type {
    CommonDummyAction,
} from '../../../actions/types';
import {
    RESET_STATE,
} from '../../../actions/types';
import type {
    CommonStateOrdersReducerTestScenarios,
} from './_test/types';
import {
    ordersReducer,
} from './index';
import {
    dummy,
} from '../../../actions';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../actions/types';
import {
    createScheduledAttackOrderTestScenarios,
} from './_test/create-scheduled-attack-order-test-scenarios';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import {
    executeTimeStepTestScenarios,
} from './_test/execute-time-step-test-scenarios';
import {
    DUMMY,
} from '../../../../../../client/src/state/modules/actions/types';
import {
    runReducerTestScenarios,
} from '../../test-utils';

const stateInitializationScenario: CommonStateOrdersReducerTestScenarios< CommonDummyAction > = {
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
                scenarios : {
                    [ CREATE_SCHEDULED_ATTACK_ORDER ]: createScheduledAttackOrderTestScenarios,
                    [ DUMMY ]                        : [
                        stateInitializationScenario,
                    ],
                    [ EXECUTE_TIME_STEP ]: executeTimeStepTestScenarios,
                    [ RESET_STATE ]      : resetStateTestScenarios,
                },
            },
        );

    },
);
