// @flow

import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientSelectCityViewBuildingsTabAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientSelectCityViewBuildingsTabAction >, >;

export const selectCityViewBuildingsTabTestScenarios: Scenarios = [
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
