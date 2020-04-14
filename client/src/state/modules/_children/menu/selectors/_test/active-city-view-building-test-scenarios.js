// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    CommonStateBuildingKey,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import {
    BUILDING_WAREHOUSE,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< CommonStateBuildingKey >, >;

export const activeCityViewBuildingSelectorTestScenarios: Scenarios = [
    {
        expectedValue: BUILDING_WAREHOUSE,
        name         : `returns the active building`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    building: BUILDING_WAREHOUSE,
                },
            },
        },
    },
];
