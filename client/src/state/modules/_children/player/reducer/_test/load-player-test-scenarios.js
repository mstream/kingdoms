// @flow


import type { ClientStatePlayerReducerTestScenario } from './types';
import type { ClientLoadPlayerAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

type Scenarios = $ReadOnlyArray<ClientStatePlayerReducerTestScenario<ClientLoadPlayerAction>>;

export const loadPlayerTestScenarios: Scenarios = [
    {
        name: 'select city view unit',
        action: clientActions.player.loadPlayer({
            name: 'player1',
        }),
        previousGlobalState: {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: null,
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                name: 'player1',
            };
        },
    },
];