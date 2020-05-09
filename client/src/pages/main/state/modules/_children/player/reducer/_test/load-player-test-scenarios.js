// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientLoadPlayerAction,
} from '../../actions/types';
import type {
    ClientStatePlayerReducerTestScenario,
} from './types';

type Scenario = ClientStatePlayerReducerTestScenario< ClientLoadPlayerAction >;
type Scenarios = $ReadOnlyArray< Scenario, >;

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
