// @flow

import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';
import { TAB_ORDERS } from '../../_children/menu/reducer/types';
import { emptyScheduledAttackOrderState } from '../../../../../../common/src/state/modules/orders/reducer/state';
import { emptyClientState } from '../../../state';
import type { ClientStateSelectorTestScenario } from '../../../types';
import type { ScheduledAttackOrderInfosById } from '../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?ScheduledAttackOrderInfosById>>;

export const scheduledAttackOrdersForViewedCitySelectorTestScenarios: Scenarios = [
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
                        ownerId: 'player1',
                    },
                    'city2': {
                        ...emptyCityState,
                        name: 'Citytwo',
                        ownerId: 'player2',
                    },
                    'city3': {
                        ...emptyCityState,
                        name: 'Citythree',
                        ownerId: 'player3',
                    },
                    'city4': {
                        ...emptyCityState,
                        name: 'Cityfour',
                        ownerId: 'player4',
                    },
                },
                orders: {
                    ...emptyCommonState.orders,
                    creationTimes: {
                        'order1': '2000-01-01T01:00:00Z',
                        'order2': '2000-01-01T02:00:00Z',
                        'order3': '2000-01-01T03:00:00Z',
                    },
                    items: {
                        scheduledAttack: {
                            'order1': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city1',
                                targetCityId: 'city2',
                            },
                            'order2': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city3',
                                targetCityId: 'city1',
                            },
                            'order3': {
                                ...emptyScheduledAttackOrderState,
                                originCityId: 'city4',
                                targetCityId: 'city4',
                            },
                        },
                    },
                    ownerships: {
                        'order1': 'player1',
                        'order2': 'player3',
                        'order3': 'player4',
                    },
                },
            },
        },
        expectedValue: {
            'order1': {
                ...emptyScheduledAttackOrderState,
                creationTime: '2000-01-01T01:00:00Z',
                originCityId: 'city1',
                playerId: 'player1',
                targetCityId: 'city2',
            },
        },
    },
];
