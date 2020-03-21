// @flow

import { initialCommonState } from '../../../index';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { worldReducer } from './index';
import { runTestScenarios, success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonDummyAction } from '../../../actions/types';
import { DUMMY, RESET_STATE } from '../../../actions/types';
import type { CommonStateWorldReducerTestScenarios } from './test/types';
import { dummy } from '../../../actions';

const stateInitializationScenario: CommonStateWorldReducerTestScenarios<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        world: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.world });
    },
};

describe('worldReducer', () => {
    runTestScenarios({
        reducer: worldReducer,
        reducerKey: 'world',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [RESET_STATE]: resetStateTestScenarios,
        },
    });
});
