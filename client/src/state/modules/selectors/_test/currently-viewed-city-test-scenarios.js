// @flow

import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/cities/reducer/state';
import type {
    CommonStateCity,
} from '../../../../../../common/src/state/modules/cities/reducer/types';
import {
    emptyClientState,
} from '../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ?CommonStateCity >, >;

export const currentlyViewedCitySelectorTestScenarios: Scenarios = [
    {
        expectedValue: null,
        name         : `returns null when common state is not loaded`,
        state        : {
            ...emptyClientState,
            commonState: null,
            menu       : {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: `city2`,
                },
            },
        },
    },
    {
        expectedValue: {
            ...emptyCityState,
            name: `Citytwo`,
        },
        name : `returns currently viewed city`,
        state: {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        name: `Cityone`,
                    },
                    city2: {
                        ...emptyCityState,
                        name: `Citytwo`,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: `city2`,
                },
            },
        },
    },
];
