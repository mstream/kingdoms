// @flow

import { rulesReducer } from './index';
import { initialCommonState } from '../../../index';
import { dummy } from '../../../actions';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonAction, CommonDummyAction } from '../../../actions/types';
import type { CommonStateRulesReducerTestScenarios } from './test/types';

const runScenarios = (
    {
        scenarios,
    }: {
        scenarios: $ReadOnlyArray<CommonStateRulesReducerTestScenarios<CommonAction>>
    },
): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.rules;

                const actual = rulesReducer(
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
    // $FlowFixMe
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...resetStateTestScenarios,
        ],
    });
});
