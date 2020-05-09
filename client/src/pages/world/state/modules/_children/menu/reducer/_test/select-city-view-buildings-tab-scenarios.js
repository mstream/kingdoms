// @flow

import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientSelectCityViewBuildingsTabAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario =
    ClientStateMenuReducerTestScenario< ClientSelectCityViewBuildingsTabAction >;

type Scenarios = $ReadOnlyArray< Scenario >;

export const selectCityViewBuildingsTabScenarios: Scenarios = [
    {
        action: clientActions.menu.selectCityViewBuildingsTab(
            {
                buildingType: BUILDING_PASTURE,
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
                    building: BUILDING_PASTURE,
                },
            };

        },
        name               : `selects city view building`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    building: BUILDING_LUMBER_MILL,
                },
            },
        },
    },
];
