// @flow

import { dummy } from '../../../actions';
import { citiesReducer } from './index';
import { initialCommonState } from '../../../index';
import { abandonCityTestScenarios } from '../test/abandon-city-test-scenarios';
import { changeCityNameTestScenarios } from '../test/change-city-name-test-scenarios';
import { createCityNameTestScenarios } from '../test/create-city-test-scenarios';
import { executeTimeStepTestScenarios } from '../test/execute-time-step-test-scenarios';
import { resetStateTestScenarios } from '../test/reset-state-test-scenarios';
import { upgradeBuildingTestScenarios } from '../test/upgrade-building-test-scenarios';
import { success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonAction, CommonDummyAction } from '../../../actions/types';
import type { CommonStateCitiesReducerTestScenarios } from '../test/types';

const runScenarios = (
    {
        scenarios,
    }: {
        scenarios: $ReadOnlyArray<CommonStateCitiesReducerTestScenarios<CommonAction>>
    },
): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.cities;

                const actual = citiesReducer(
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

const stateInitializationScenario: CommonStateCitiesReducerTestScenarios<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        cities: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.cities });
    },
};

describe('citiesReducer', () => {
    // $FlowFixMe
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...abandonCityTestScenarios,
            ...changeCityNameTestScenarios,
            ...createCityNameTestScenarios,
            ...executeTimeStepTestScenarios,
            ...resetStateTestScenarios,
            ...upgradeBuildingTestScenarios,
        ],
    });
});