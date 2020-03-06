// @flow

import { dummy } from '../../actions';
import type { ClientState, ClientStateCamera } from '../../state';
import { emptyClientState, initialClientState } from '../../state';
import { cameraReducer } from './index';

describe('cameraReducer', () => {
    it('initializes its state', () => {
        const action = dummy();

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ?ClientStateCamera = undefined;

        const expected: ClientStateCamera = {
            ...initialClientState.camera,
        };

        const actual = cameraReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });


});
