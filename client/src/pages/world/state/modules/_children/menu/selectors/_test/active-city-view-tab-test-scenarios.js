// @flow

import {
    TAB_ORDERS,
} from '../../reducer/types';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateCityViewTab,
} from '../../reducer/types';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenario = ClientStateSelectorTestScenario< ClientStateCityViewTab >;
type Scenarios = $ReadOnlyArray< Scenario, >;

export const activeCityViewTabSelectorTestScenarios: Scenarios = [
    {
        expectedValue: TAB_ORDERS,
        name         : `returns the active tab`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    tab: TAB_ORDERS,
                },
            },
        },
    },
];
