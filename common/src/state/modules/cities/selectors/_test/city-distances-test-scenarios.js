// @flow

import {
    emptyCityState,
} from '../../reducer/state';
import {
    emptyCommonState,
} from '../../../state';
import type {
    CitiesDistances,
} from '../types';
import type {
    CommonStateSelectorTestScenario,
} from '../../../types';

type Scenarios = $ReadOnlyArray< CommonStateSelectorTestScenario< CitiesDistances >, >;

export const citiesDistancesSelectorTestScenarios: Scenarios = [
    {
        expectedValue: {
            city1: {
                city1: 0,
                city2: 2,
                city3: 3,
            },
            city2: {
                city1: 2,
                city2: 0,
                city3: 1,
            },
            city3: {
                city1: 3,
                city2: 1,
                city3: 0,
            },
        },
        name : `returns city ids grouped by owner id`,
        state: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    location: {
                        x: -2,
                        y: 0,
                    },
                },
                city2: {
                    ...emptyCityState,
                    location: {
                        x: 0,
                        y: 0,
                    },
                },
                city3: {
                    ...emptyCityState,
                    location: {
                        x: 1,
                        y: 0,
                    },
                },
            },
        },
    },
];
