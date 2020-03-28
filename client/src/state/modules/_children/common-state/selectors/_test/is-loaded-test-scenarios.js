// @flow


import { emptyClientState } from '../../../../../state';
import { emptyCommonState } from '../../../../../../../../common/src/state/modules/state';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>;

export const isLoadedSelectorTestScenarios: Scenarios = [
    {
        name: 'returns false when common state is absent',
        state: {
            ...emptyClientState,
            commonState: null,
        },
        expectedValue: false,
    },
    {
        name: 'returns true when common state is present',
        state: {
            ...emptyClientState,
            player: {
                name: null,
            },
            commonState: emptyCommonState,
        },
        expectedValue: true,
    },
];
