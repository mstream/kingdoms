// @flow

import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../types';
import type {
    CommonStateCity,
} from '../../../../../../common/src/state/modules/cities/reducer/types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ?CommonStateCity >, >;

export const attackedCitySelectorTestScenarios: Scenarios = [
    {
        expectedValue: null,
        name         : `returns null if common state is not loaded`,
        state        : {
            ...emptyClientState,
            commonState: null,
        },
    },
    {
        expectedValue: {
            ...emptyCityState,
            ownerId: `Citytwo`,
        },
        name : `returns attacked city when common state is loaded`,
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
                        ownerId: `Citytwo`,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: `city2`,
                },
            },
        },
    },
];
