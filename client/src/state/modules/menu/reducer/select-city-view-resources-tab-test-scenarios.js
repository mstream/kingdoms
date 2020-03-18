// @flow


import type { ClientStateMenuReducerTestScenario } from './types';
import { emptyClientState } from '../../types';
import type { ClientSelectCityViewResourceTabAction } from '../actions';
import { selectCityViewResourcesTab } from '../actions';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../../common/src/state/modules/rules/reducer/types';

export const selectCityViewResourcesTabTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectCityViewResourceTabAction>> = [
    {
        name: 'select city view resource',
        action: selectCityViewResourcesTab({ resourceType: RESOURCE_FOOD }),
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
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                cityView: {
                    ...previousLocalState.cityView,
                    resource: RESOURCE_FOOD,
                },
            };
        },
    },
];
