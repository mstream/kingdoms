// @flow

import {loadPlayer, updateState} from '../actions';
import type {ClientState, ClientStateMenu, ClientStatePlayer} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {initialServerState} from '../../../../server/src/state/state';
import {serverStateReducer} from './server-state';
import type {ServerState} from '../../../../common/src/state';
import {playerReducer} from './player';

describe('playerReducer', () => {
    it('initializes its state', () => {
        const action = {
            type: '_DUMMY_',
        };

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ?ClientStatePlayer = undefined;

        const expected: ClientStatePlayer = {
            ...initialClientState.player,
        };

        const actual = playerReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles load player event', () => {
        const action = loadPlayer({name: 'player1'});
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: null,
            }
        };
        const previousLocalState: ClientStatePlayer = previousGlobalState.player;
        const expected: ClientStatePlayer = {
            ...previousLocalState,
            name: 'player1'
        };
        const actual = playerReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });
});
