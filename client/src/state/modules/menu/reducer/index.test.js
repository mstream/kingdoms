// @flow

import { dummy } from '../../../actions';
import { menuReducer } from './index';
import { closeAttackViewTestScenarios } from './test/close-attack-view-test-scenarios';
import { closeCityViewTestScenarios } from './test/close-city-view-test-scenarios';
import { openAttackViewTestScenarios } from './test/open-attack-view-test-scenarios';
import { openCityViewTestScenarios } from './test/open-city-view-test-scenarios';
import { requestCityCreationTestScenarios } from './test/request-city-creation-test-scenarios';
import { selectCityViewTabTestScenarios } from './test/select-city-view-tab-test-scenarios';
import { selectCityViewUnitsTabTestScenarios } from './test/select-city-view-units-tab-test-scenarios';
import { updateStateTestScenarios } from './test/update-state.test-scenarios';
import { emptyClientState } from '../../types';
import { TAB_BUILDINGS, TAB_OVERVIEW } from './types';
import { selectAttackViewAttackingCityTestScenarios } from './test/select-attack-view-attacking-city-test-scenarios';
import { selectCityViewBuildingsTabTestScenarios } from './test/select-city-view-buildings-tab-test-scenarios';
import { selectCityViewResourcesTabTestScenarios } from './test/select-city-view-resources-tab-test-scenarios';
import {
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT, UNIT_PIKEMAN, UNIT_SWORDSMAN,
} from '../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientAction } from '../../../types';
import type { ClientDummyAction } from '../../../actions/types';
import type { ClientStateMenuReducerTestScenario } from './test/types';
import { updateAttackViewRegimentTemplateTestScenarios } from './test/update-attack-view-regiment-template-test-scenarios';
import { emptyRange } from '../../../../../../common/src/range';
import { updateAttackViewMinimumDelay } from '../actions';
import { updateAttackViewMinimumDelayTestScenarios } from './test/update-attack-view-minimum-delay-test-scenarios';

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
                minimumDelay: 0,
                regimentTemplate: {
                    [UNIT_ARCHER]: {
                        from: 0,
                        to: 0,
                    },
                    [UNIT_CATAPULT]: {
                        from: 0,
                        to: 0,
                    },
                    [UNIT_KNIGHT]: {
                        from: 0,
                        to: 0,
                    },
                    [UNIT_NOBLE]: {
                        from: 0,
                        to: 0,
                    },
                    [UNIT_PEASANT]: {
                        from: 0,
                        to: 0,
                    },
                    [UNIT_PIKEMAN]: {
                        from: 0,
                        to: 0,
                    },
                    [UNIT_SWORDSMAN]: {
                        from: 0,
                        to: 0,
                    },
                },
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
            ...updateAttackViewMinimumDelayTestScenarios,
            ...updateAttackViewRegimentTemplateTestScenarios,
            ...updateStateTestScenarios,
        ],
    });
});
