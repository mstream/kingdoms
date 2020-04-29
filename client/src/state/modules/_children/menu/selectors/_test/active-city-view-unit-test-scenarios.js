// @flow

import {
    UNIT_ARCHER,
} from '../../../../../../../../common/src/state/modules/_children/rules/types';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';
import type {
    CommonStateUnitKey,
} from '../../../../../../../../common/src/state/modules/_children/rules/types';

type Scenarios =
    $ReadOnlyArray< ClientStateSelectorTestScenario< CommonStateUnitKey >, >;

export const activeCityViewUnitSelectorTestScenarios: Scenarios = [
    {
        expectedValue: UNIT_ARCHER,
        name         : `returns the active unit`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    unit: UNIT_ARCHER,
                },
            },
        },
    },
];
