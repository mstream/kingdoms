// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< string > >;

export const activeCityViewOrderIdSelectorTestScenarios: Scenarios = [
    {
        expectedValue: `order1`,
        name         : `returns the active order`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    orderId: `order1`,
                },
            },
        },
    },
];
