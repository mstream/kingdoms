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

type Scenario = ClientStateSelectorTestScenario< ClientStateTiles >;
type Scenarios = $ReadOnlyArray< Scenario, >;

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
