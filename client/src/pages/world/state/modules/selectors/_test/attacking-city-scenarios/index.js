// @flow

import {
    emptyCityState,
} from '../../../../../../../../../common/src/state/modules/_children/cities/reducer';
import {
    emptyClientState,
} from '../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../../common/src/state/modules/state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../types';
import type {
    CommonStateCity,
} from '../../../../../../../../../common/src/state/modules/_children/cities/types';

type Scenarios =
    $ReadOnlyArray< ClientStateSelectorTestScenario< ?CommonStateCity >, >;

export const attackingCityScenarios: Scenarios = [
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
        name : `returns attacking city when common state is loaded`,
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
                    attackingCityId: `city2`,
                },
            },
        },
    },
];
