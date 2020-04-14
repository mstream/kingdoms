// @flow

import {
    TAB_BUILDINGS, TAB_UNITS,
} from '../types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientSelectCityViewTabAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

export const selectCityViewTabTestScenarios: $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientSelectCityViewTabAction >, > = [
    {
        action: clientActions.menu.selectCityViewTab(
            {
                tab: TAB_UNITS,
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
                    tab: TAB_UNITS,
                },
            };

        },
        name               : `selects city view tab`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    tab: TAB_BUILDINGS,
                },
            },
        },
    },
];
