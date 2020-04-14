// @flow

import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientSelectCityViewOrdersTabAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientSelectCityViewOrdersTabAction >, >;

export const selectCityViewOrdersTabTestScenarios: Scenarios = [
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
