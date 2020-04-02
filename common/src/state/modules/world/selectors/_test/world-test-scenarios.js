// @flow

import type { CommonStateSelectorTestScenario } from '../../../types';
import { emptyCommonState } from '../../../state';
import type { CommonStateWorld } from '../../reducer/types';

type Scenarios = $ReadOnlyArray<
    CommonStateSelectorTestScenario<CommonStateWorld>,
>;

export const worldSelectorTestScenarios: Scenarios = [
    {
        name: 'returns world',
        state: {
            ...emptyCommonState,
            world: emptyCommonState.world,
        },
        expectedValue: emptyCommonState.world,
    },
];
