// @flow

import {
    TAB_BUILDINGS, TAB_UNITS,
} from '../types';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientSelectCityViewTabAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario = ClientStateMenuReducerTestScenario< ClientSelectCityViewTabAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const selectCityViewTabScenarios: Scenarios = [
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
