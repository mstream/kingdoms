// @flow

import type { CommonStatePlayersReducerTestScenario } from './test/types';
import { dummy } from '../../../actions';
import { emptyCommonState } from '../../state';
import { initialCommonState } from '../../../index';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { createCityStepTestScenarios } from './test/create-city-step-test-scenarios';
import { success } from '../../utils';
import type { CommonDummyAction } from '../../../actions/types';
import type { CommonAction } from '../../../types';
import { playersReducer } from './index';
import { createOrderTestScenarios } from './test/create-order-test-scenarios';

const runScenarios = (
    {
        scenarios,
    }: {
        scenarios: $ReadOnlyArray<CommonStatePlayersReducerTestScenario<CommonAction>>
    },
): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.players;

                const actual = playersReducer(
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

const stateInitializationScenario: CommonStatePlayersReducerTestScenario<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        time: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.players });
    },
};

describe('playersReducer', () => {
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...createCityStepTestScenarios,
            ...createOrderTestScenarios,
            ...resetStateTestScenarios,
        ],
    });
});
