// @flow


import { emptyCommonState } from '../../../state';
import { emptyOrderState } from '../../reducer/state';
import type { CommonStateOrders } from '../../reducer/types';
import type { CommonStateSelectorTestScenario } from '../../../types';

type Scenarios = $ReadOnlyArray<CommonStateSelectorTestScenario<CommonStateOrders>>

export const ordersSelectorTestScenarios: Scenarios = [
    {
        name: 'returns orders',
        state: {
            ...emptyCommonState,
            orders: {
                'order1': {
                    ...emptyOrderState,
                },
                'order2': {
                    ...emptyOrderState,
                },
            },
        },
        expectedValue: {
            'order1': {
                ...emptyOrderState,
            },
            'order2': {
                ...emptyOrderState,
            },
        },
    },
];
