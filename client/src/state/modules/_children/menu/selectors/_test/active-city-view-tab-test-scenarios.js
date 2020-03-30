// @flow

import { emptyClientState } from '../../../../../state';
import { TAB_ORDERS } from '../../reducer/types';
import type { ClientStateCityViewTab } from '../../reducer/types';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<ClientStateCityViewTab>>

export const activeCityViewTabSelectorTestScenarios: Scenarios = [
    {
        name: 'returns the active tab',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    tab: TAB_ORDERS,
                },
            },
        },
        expectedValue: TAB_ORDERS,
    },
];