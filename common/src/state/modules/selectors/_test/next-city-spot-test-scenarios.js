// @flow

import {
    emptyCityState,
} from '../../cities/reducer/state';
import {
    emptyCommonState,
} from '../../state';
import {
    zeroVector,
} from '../../../../vector';
import type {
    CommonStateSelectorTestScenario,
} from '../../types';
import type {
    Vector,
} from '../../../../vector';

type Scenarios = $ReadOnlyArray< CommonStateSelectorTestScenario< ?Vector > >;

export const nextCitySpotSelectorTestScenarios: Scenarios = [
    {
        expectedValue: zeroVector,
        name         : `chooses the center of an empty map`,
        state        : {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
            },
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 1,
                    y: 1,
                },
            },
            world: {
                ...emptyCommonState.world,
                size: {
                    x: 3,
                    y: 3,
                },
            },
        },
    },
    {
        expectedValue: null,
        name         : `returns null when there are no valid spots left`,
        state        : {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                city1: {
                    ...emptyCityState,
                    location: zeroVector,
                },
                city2: {
                    ...emptyCityState,
                    location: {
                        x: 0,
                        y: -2,
                    },
                },
                city3: {
                    ...emptyCityState,
                    location: {
                        x: 2,
                        y: 0,
                    },
                },
                city4: {
                    ...emptyCityState,
                    location: {
                        x: 0,
                        y: 2,
                    },
                },
                city5: {
                    ...emptyCityState,
                    location: {
                        x: -2,
                        y: 0,
                    },
                },
                city6: {
                    ...emptyCityState,
                    location: {
                        x: -2,
                        y: -2,
                    },
                },
                city7: {
                    ...emptyCityState,
                    location: {
                        x: 2,
                        y: -2,
                    },
                },
                city8: {
                    ...emptyCityState,
                    location: {
                        x: 2,
                        y: 2,
                    },
                },
                city9: {
                    ...emptyCityState,
                    location: {
                        x: -2,
                        y: 2,
                    },
                },
            },
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 1,
                    y: 1,
                },
            },
            world: {
                ...emptyCommonState.world,
                size: {
                    x: 3,
                    y: 3,
                },
            },
        },
    },
];
