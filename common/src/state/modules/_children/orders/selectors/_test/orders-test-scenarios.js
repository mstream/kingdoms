// @flow

import {
    emptyCommonState,
} from '../../../../state';
import {
    emptyScheduledAttackOrderState,
} from '../../reducer/state';
import type {
    CommonStateOrders,
} from '../../reducer/types';
import type {
    CommonStateSelectorTestScenario,
} from '../../../../types';

type Scenarios = $ReadOnlyArray< CommonStateSelectorTestScenario< CommonStateOrders >, >;

export const ordersSelectorTestScenarios: Scenarios = [
    {
        expectedValue: {
            ...emptyCommonState.orders,
            items: {
                scheduledAttack: {
                    order1: {
                        ...emptyScheduledAttackOrderState,
                    },
                    order2: {
                        ...emptyScheduledAttackOrderState,
                    },
                },
            },
        },
        name : `returns orders`,
        state: {
            ...emptyCommonState,
            orders: {
                ...emptyCommonState.orders,
                items: {
                    scheduledAttack: {
                        order1: {
                            ...emptyScheduledAttackOrderState,
                        },
                        order2: {
                            ...emptyScheduledAttackOrderState,
                        },
                    },
                },
            },
        },
    },
];
