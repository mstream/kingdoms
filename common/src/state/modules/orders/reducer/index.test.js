// @flow

import { initialCommonState } from '../../../index';
import { runTestScenarios, success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonDummyAction } from '../../../actions/types';
import { RESET_STATE } from '../../../actions/types';
import type { CommonStateOrdersReducerTestScenarios } from './test/types';
import { ordersReducer } from './index';
import { dummy } from '../../../actions';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { CREATE_ORDER } from '../actions/types';
import { createOrderTestScenarios } from './test/create-order-test-scenarios';
import { EXECUTE_TIME_STEP } from '../../time/actions';
import { executeTimeStepTestScenarios } from './test/execute-time-step-test-scenarios';
import { DUMMY } from '../../../../../../client/src/state/actions/types';


const stateInitializationScenario: CommonStateOrdersReducerTestScenarios<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        time: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.orders });
    },
};


describe('ordersReducer', () => {
    runTestScenarios({
        reducer: ordersReducer,
        reducerKey: 'orders',
        scenarios: {
            [CREATE_ORDER]: createOrderTestScenarios,
            [DUMMY]: [stateInitializationScenario],
            [EXECUTE_TIME_STEP]: executeTimeStepTestScenarios,
            [RESET_STATE]: resetStateTestScenarios,
        },
    });
});
