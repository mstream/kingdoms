// @flow


import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../../reducer/state';
import type { CommonStateCities } from '../../reducer/types';
import type { CommonStateSelectorTestScenario } from '../../../types';

type Scenarios = $ReadOnlyArray<CommonStateSelectorTestScenario<CommonStateCities>>

export const citiesSelectorTestScenarios: Scenarios = [
    {
        name: 'returns city ids grouped by owner id',
        state: {
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
            },
        },
        expectedValue: {
            'city1': {
                ...emptyCityState,
                name: 'Cityone',
            },
            'city2': {
                ...emptyCityState,
                name: 'Citytwo',
            },
        },
    },
];
