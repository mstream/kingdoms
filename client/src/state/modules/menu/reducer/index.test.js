// @flow

import type { ClientAction, ClientDummyAction } from '../../../actions';
import { dummy } from '../../../actions';
import { menuReducer } from './index';
import { closeAttackViewTestScenarios } from './close-attack-view-test-scenarios';
import { closeCityViewTestScenarios } from './close-city-view-test-scenarios';
import { openAttackViewTestScenarios } from './open-attack-view-test-scenarios';
import { openCityViewTestScenarios } from './open-city-view-test-scenarios';
import { requestCityCreationTestScenarios } from './request-city-creation-test-scenarios';
import { selectCityViewTabTestScenarios } from './select-city-view-tab-test-scenarios';
import { selectCityViewUnitsTabTestScenarios } from './select-city-view-units-tab-test-scenarios';
import { updateStateTestScenarios } from './update-state.test-scenarios';
import { emptyClientState } from '../../types';
import type { ClientStateMenuReducerTestScenario } from './types';
import { TAB_BUILDINGS, TAB_OVERVIEW } from './types';
import {
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    UNIT_PEASANT,
} from '../../../../../../common/src/state';
import { selectAttackViewAttackingCityTestScenarios } from './select-attack-view-attacking-city-test-scenarios';
import { selectCityViewBuildingsTabTestScenarios } from './select-city-view-buildings-tab-test-scenarios';
import { selectCityViewResourcesTabTestScenarios } from './select-city-view-resources-tab-test-scenarios';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.menu;
                const actual = menuReducer(previousLocalState, scenario.action, scenario.previousGlobalState);
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
            attackView: {
                attackedCityId: null,
                attackingCityId: null,
                regimentTemplate: {},
            },
            cityView: {
                building: BUILDING_WAREHOUSE,
                currentCityId: null,
                tab: TAB_OVERVIEW,
                unit: UNIT_PEASANT,
                resource: RESOURCE_FOOD,
            },
            newCity: {
                isCityBeingCreated: false,
            },
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
            ...selectAttackViewAttackingCityTestScenarios,
            ...selectCityViewTabTestScenarios,
            ...selectCityViewBuildingsTabTestScenarios,
            ...selectCityViewResourcesTabTestScenarios,
            ...selectCityViewUnitsTabTestScenarios,
            ...updateStateTestScenarios,
        ],
    });
});
