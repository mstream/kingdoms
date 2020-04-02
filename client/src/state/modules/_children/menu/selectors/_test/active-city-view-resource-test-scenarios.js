// @flow

import { emptyClientState } from '../../../../../state';
import type { CommonStateResourceKey } from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import { RESOURCE_WOOD } from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<
    ClientStateSelectorTestScenario<CommonStateResourceKey>,
>;

export const activeCityViewResourceSelectorTestScenarios: Scenarios = [
    {
        name: 'returns the active resource',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    resource: RESOURCE_WOOD,
                },
            },
        },
        expectedValue: RESOURCE_WOOD,
    },
];
