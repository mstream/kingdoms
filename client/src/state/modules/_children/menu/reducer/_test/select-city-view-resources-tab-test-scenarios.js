// @flow

import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientSelectCityViewResourceTabAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario = ClientStateMenuReducerTestScenario< ClientSelectCityViewResourceTabAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const selectCityViewResourcesTabTestScenarios: Scenarios = [
    {
        action: clientActions.menu.selectCityViewResourcesTab(
            {
                resourceType: RESOURCE_FOOD,
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    resource: RESOURCE_FOOD,
                },
            };

        },
        name               : `select city view resource`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    resource: RESOURCE_WOOD,
                },
            },
        },
    },
];
