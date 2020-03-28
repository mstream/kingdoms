import { runTestScenarios, success } from '../../utils';
import { RESET_STATE } from '../../../actions/types';
import { EXECUTE_TIME_STEP } from '../actions';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { executeTimeStepTestScenarios } from './test/execute-time-step-test-scenarios';
import type { CommonStateTimeReducerTestScenarios } from './test/types';
import type { CommonDummyAction } from '../../../actions/types';
import { dummy } from '../../../actions';
import { emptyCommonState } from '../../state';
import { initialCommonState } from '../../../index';
import { timeReducer } from './index';
import { DUMMY } from '../../../../../../client/src/state/modules/actions/types';

const stateInitializationScenario: CommonStateTimeReducerTestScenarios<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        time: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.time });
    },
};

describe('timeReducer', () => {
    runTestScenarios({
        reducer: timeReducer,
        reducerKey: 'time',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [RESET_STATE]: resetStateTestScenarios,
            [EXECUTE_TIME_STEP]: executeTimeStepTestScenarios,
        },
    });
});
