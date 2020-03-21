// @flow

import { initialCommonState } from '../../../index';
import { timeReducer } from './index';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { executeTimeStepTestScenarios } from './test/execute-time-step-test-scenarios';
import { success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonDummyAction } from '../../../actions/types';
import type { CommonStateTimeReducerTestScenarios } from './test/types';
import { dummy } from '../../../actions';
import type { CommonAction } from '../../../types';

const runScenarios = (
    {
        scenarios,
    }: {
        scenarios: $ReadOnlyArray<CommonStateTimeReducerTestScenarios<CommonAction>>
    },
): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.time;

                const actual = timeReducer(
                    previousLocalState,
                    scenario.action,
                    scenario.previousGlobalState,
                );

                const expectedReductionResult = scenario.expectedReductionResultCreator({ previousLocalState });

                expect(actual).toEqual(expectedReductionResult);
            });
        },
    );
};

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
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...resetStateTestScenarios,
            ...executeTimeStepTestScenarios,
        ],
    });
});
