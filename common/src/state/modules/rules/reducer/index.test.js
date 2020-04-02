// @flow

import { runTestScenarios, success } from '../../utils';
import type { CommonDummyAction } from '../../../actions/types';
import { RESET_STATE } from '../../../actions/types';
import type { CommonStateRulesReducerTestScenarios } from './test/types';
import { emptyCommonState } from '../../state';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { dummy } from '../../../actions';
import { initialCommonState } from '../../../index';
import { rulesReducer } from './index';
import { DUMMY } from '../../../../../../client/src/state/modules/actions/types';

const stateInitializationScenario: CommonStateRulesReducerTestScenarios<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        rules: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.rules });
    },
};

describe('rulesReducer', () => {
    runTestScenarios({
        reducer: rulesReducer,
        reducerKey: 'rules',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [RESET_STATE]: resetStateTestScenarios,
        },
    });
});
