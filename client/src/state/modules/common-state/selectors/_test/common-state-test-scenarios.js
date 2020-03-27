// @flow


import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';
import { emptyCommonState } from '../../../../../../../common/src/state/modules/state';
import type { ClientStateCommonState } from '../../reducer/types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<ClientStateCommonState>>;

export const commonStateSelectorTestScenarios: Scenarios = [
    {
        name: 'returns null when common state is absent',
        state: {
            ...emptyClientState,
            commonState: null,
        },
        expectedValue: null,
    },
    {
        name: 'returns common state when common state is present',
        state: {
            ...emptyClientState,
            player: {
                name: null,
            },
            commonState: emptyCommonState,
        },
        expectedValue: emptyCommonState,
    },
];
