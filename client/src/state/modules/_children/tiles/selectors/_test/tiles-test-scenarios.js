// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateTiles } from '../../reducer/types';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<
    ClientStateSelectorTestScenario<ClientStateTiles>,
>;

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
