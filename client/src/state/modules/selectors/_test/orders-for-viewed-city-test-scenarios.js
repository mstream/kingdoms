// @flow

import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';
import { TAB_ORDERS } from '../../menu/reducer/types';
import { emptyOrderState } from '../../../../../../common/src/state/modules/orders/reducer/state';
import type { ClientStateSelectorTestScenario } from '../../types';
import type { CommonStateOrders } from '../../../../../../common/src/state/modules/orders/reducer/types';
import { emptyClientState } from '../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?CommonStateOrders>>;

export const ordersForViewedCitySelectorTestScenarios: Scenarios = [
    {
        name: 'selects orders relevant for the currently viewed city',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                    tab: TAB_ORDERS,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        name: 'Cityone',
                    },
                    'city2': {
                        ...emptyCityState,
                        name: 'Citytwo',
                    },
                    'city3': {
                        ...emptyCityState,
                        name: 'Citythree',
                    },
                    'city4': {
                        ...emptyCityState,
                        name: 'Cityfour',
                    },
                },
                orders: {
                    'order1': {
                        ...emptyOrderState,
                        originCityId: 'city1',
                        targetCityId: 'city2',
                    },
                    'order2': {
                        ...emptyOrderState,
                        originCityId: 'city3',
                        targetCityId: 'city1',
                    },
                    'order3': {
                        ...emptyOrderState,
                        originCityId: 'city4',
                        targetCityId: 'city4',
                    },
                },
            },
        },
        expectedValue: {
            'order1': {
                ...emptyOrderState,
                originCityId: 'city1',
                targetCityId: 'city2',
            },
            'order2': {
                ...emptyOrderState,
                originCityId: 'city3',
                targetCityId: 'city1',
            },
        },
    },
];
