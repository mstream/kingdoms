// @flow


import { playerReducer } from './index';
import { dummy } from '../../../../../common/src/actions';
import type { ClientState, ClientStatePlayer } from '../../state';
import { emptyClientState, initialClientState } from '../../state';

describe('playerReducer', () => {
    it('initializes its state', () => {
        const action = dummy();

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
});
