// @flow

import type { ClientAction, ClientDummyAction } from '../../actions';
import { dummy } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState, initialClientState } from '../../state';
import { menuReducer } from '.';
import { closeAttackViewTestScenarios } from './close-attack-view-test-scenarios';
import type { ClientStateReducerTestScenario } from '../root';
import { closeCityViewTestScenarios } from './close-city-view-test-scenarios';
import { openAttackViewTestScenarios } from './open-attack-view-test-scenarios';
import { openCityViewTestScenarios } from './open-city-view-test-scenarios';
import { requestCityCreationTestScenarios } from './request-city-creation-test-scenarios';
import { selectCityViewTabTestScenarios } from './select-city-view-tab-test-scenarios';
import { selectCityViewUnitTestScenarios } from './select-city-view-unit-test-scenarios';
import { updateStateTestScenarios } from './update-state.test-scenarios';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientAction>> }): void => {
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

const stateInitializationScenario: ClientStateReducerTestScenario<ClientStateMenu, ClientDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyClientState,
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
