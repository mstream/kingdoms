// @flow

import {
    BUILDING_WAREHOUSE,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';
import type {
    CommonStateBuildingKey,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

type Scenario = ClientStateSelectorTestScenario< CommonStateBuildingKey >;
type Scenarios = $ReadOnlyArray< Scenario, >;

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
