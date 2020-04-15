// @flow

import {
    RESOURCE_WOOD,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';
import type {
    CommonStateResourceKey,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< CommonStateResourceKey >, >;

export const activeCityViewResourceSelectorTestScenarios: Scenarios = [
    {
        expectedValue: RESOURCE_WOOD,
        name         : `returns the active resource`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    resource: RESOURCE_WOOD,
                },
            },
        },
    },
];
