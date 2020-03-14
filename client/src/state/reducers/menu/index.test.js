// @flow

import type { ClientAction, ClientDummyAction } from '../../actions';
import { dummy } from '../../actions';
import { emptyClientState, initialClientState } from '../../state';
import { menuReducer } from '.';
import { closeAttackViewTestScenarios } from './close-attack-view-test-scenarios';
import { closeCityViewTestScenarios } from './close-city-view-test-scenarios';
import { openAttackViewTestScenarios } from './open-attack-view-test-scenarios';
import { openCityViewTestScenarios } from './open-city-view-test-scenarios';
import { requestCityCreationTestScenarios } from './request-city-creation-test-scenarios';
import { selectCityViewTabTestScenarios } from './select-city-view-tab-test-scenarios';
import { selectCityViewUnitTestScenarios } from './select-city-view-unit-test-scenarios';
import { updateStateTestScenarios } from './update-state.test-scenarios';
import type { ClientStateMenuReducerTestScenario } from './index';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.menu;
                const actual = menuReducer(scenario.previousGlobalState.menu, scenario.action, scenario.previousGlobalState);
                const expectedLocalState = scenario.expectedLocalStateCreator({ previousLocalState });
                expect(actual).toEqual(expectedLocalState);
            });
        },
    );
};

const stateInitializationScenario: ClientStateMenuReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyClientState,
        // $FlowFixMe
        menu: undefined,
    },
    expectedLocalStateCreator: ({ previousLocalState }) => {
        return {
            ...initialClientState.menu,
        };
    },
};

describe('menuReducer', () => {
    // $FlowFixMe
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...closeAttackViewTestScenarios,
            ...closeCityViewTestScenarios,
            ...openAttackViewTestScenarios,
            ...openCityViewTestScenarios,
            ...requestCityCreationTestScenarios,
            ...selectCityViewTabTestScenarios,
            ...selectCityViewUnitTestScenarios,
            ...updateStateTestScenarios,
        ],
    });
});
