// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';
import type { ClientStateTiles } from '../../reducer/types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<ClientStateTiles>>

export const tilesSelectorTestScenarios: Scenarios = [
    {
        name: 'returns tiles',
        state: {
            ...emptyClientState,
            tiles: emptyClientState.tiles,
        },
        expectedValue: emptyClientState.tiles,
    },
];
