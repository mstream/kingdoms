// @flow


import { loadPlayer } from '../../actions';
import type { ClientStatePlayerReducerTestScenario } from './types';
import type { ClientLoadPlayerAction } from '../../actions/types';
import { emptyClientState } from '../../../state';


export const loadPlayerTestScenarios: $ReadOnlyArray<ClientStatePlayerReducerTestScenario<ClientLoadPlayerAction>> = [
    {
        name: 'select city view unit',
        action: loadPlayer({ name: 'player1' }),
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