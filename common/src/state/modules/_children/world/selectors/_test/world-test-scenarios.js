// @flow

import {
    emptyCommonState,
} from '../../../../state';
import type {
    CommonStateSelectorTestScenario,
} from '../../../../types';
import type {
    CommonStateWorld,
} from '../../reducer/types';

type Scenarios =
    $ReadOnlyArray< CommonStateSelectorTestScenario< CommonStateWorld >, >;

export const worldSelectorTestScenarios: Scenarios = [
    {
        expectedValue: emptyCommonState.world,
        name         : `returns world`,
        state        : {
            ...emptyCommonState,
            world: emptyCommonState.world,
        },
    },
];
