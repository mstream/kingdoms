// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';
import type {
    ClientStateTiles,
} from '../../reducer/types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ClientStateTiles >, >;

export const tilesSelectorTestScenarios: Scenarios = [
    {
        expectedValue: emptyClientState.tiles,
        name         : `returns tiles`,
        state        : {
            ...emptyClientState,
            tiles: emptyClientState.tiles,
        },
    },
];
