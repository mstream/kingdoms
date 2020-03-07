// @flow


import type { ClientState, ClientStatePlayer } from '../../state';
import { emptyClientState } from '../../state';
import { loadPlayer } from '../../actions';
import { loadPlayerPlayerReducer } from './load-player';

describe('loadPlayerPlayerReducer', () => {
    it('handles load player event', () => {
        const action = loadPlayer({ name: 'player1' });

        const previousGlobalState: ClientState = {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: null,
            },
        };

        const previousLocalState: ClientStatePlayer = previousGlobalState.player;

        const expected: ClientStatePlayer = {
            ...previousLocalState,
            name: 'player1',
        };

        const actual = loadPlayerPlayerReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
