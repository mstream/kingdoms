// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientSelectCityViewOrdersTabAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenario =
    ClientStateMenuReducerTestScenario< ClientSelectCityViewOrdersTabAction >;

type Scenarios = $ReadOnlyArray< Scenario >;

export const selectCityViewOrdersTabScenarios: Scenarios = [
    {
        action: clientActions.menu.selectCityViewOrdersTab(
            {
                orderId: `order1`,
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
                    orderId: `order1`,
                },
            };

        },
        name               : `selects city view order`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    orderId: `order2`,
                },
            },
        },
    },
];
