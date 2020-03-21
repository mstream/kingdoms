// @flow

import { initialCommonState } from '../../../index';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { worldReducer } from './index';
import { success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonDummyAction } from '../../../actions/types';
import type { CommonStateWorldReducerTestScenarios } from './test/types';
import { dummy } from '../../../actions';
import type { CommonAction } from '../../../types';

const runScenarios = (
    {
        scenarios,
    }: {
        scenarios: $ReadOnlyArray<CommonStateWorldReducerTestScenarios<CommonAction>>
    },
): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.world;

                const actual = worldReducer(
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
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...resetStateTestScenarios,
        ],
    });
});
