// @flow

import {
    RESOURCE_WOOD,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/types';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';
import type {
    CommonStateResourceKey,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/types';

type Scenario =
    ClientStateSelectorTestScenario< CommonStateResourceKey >;

type Scenarios = $ReadOnlyArray< Scenario, >;

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
