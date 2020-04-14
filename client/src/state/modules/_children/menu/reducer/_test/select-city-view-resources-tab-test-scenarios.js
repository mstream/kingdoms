// @flow

import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientSelectCityViewResourceTabAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientSelectCityViewResourceTabAction >, >;

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
