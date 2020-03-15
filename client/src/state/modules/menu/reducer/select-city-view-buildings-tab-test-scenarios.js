// @flow


import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
} from '../../../../../../common/src/state';
import type { ClientStateMenuReducerTestScenario } from './types';
import { emptyClientState } from '../../types';
import type { ClientSelectCityViewBuildingsTabAction } from '../actions';
import { selectCityViewBuildingsTab } from '../actions';

export const selectCityViewBuildingsTabTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectCityViewBuildingsTabAction>> = [
    {
        name: 'selects city view building',
        action: selectCityViewBuildingsTab({ buildingType: BUILDING_PASTURE }),
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
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    building: BUILDING_PASTURE,
                },
            };
        },
    },
];