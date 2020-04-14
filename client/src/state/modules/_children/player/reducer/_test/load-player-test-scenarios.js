// @flow

import type {
    ClientStatePlayerReducerTestScenario,
} from './types';
import type {
    ClientLoadPlayerAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStatePlayerReducerTestScenario< ClientLoadPlayerAction >, >;

export const loadPlayerTestScenarios: Scenarios = [
    {
        action: clientActions.player.loadPlayer(
            {
                name: `player1`,
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                name: `player1`,
            };

        },
        name               : `select city view unit`,
        previousGlobalState: {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: null,
            },
        },
    },
];
