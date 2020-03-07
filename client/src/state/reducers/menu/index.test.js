// @flow

import { dummy } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState, initialClientState } from '../../state';
import { menuReducer } from '.';

describe('menuReducer', () => {
    it('initializes its state', () => {
        const action = dummy();

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ?ClientStateMenu = undefined;

        const expected: ClientStateMenu = {
            ...initialClientState.menu,
        };

        const actual = menuReducer(previousLocalState, action, previousGlobalState);

        expect(actual).toEqual(expected);
    });


});
