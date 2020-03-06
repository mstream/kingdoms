// @flow

import { updateState } from '../../actions';
import type { ClientState, ClientStateCamera } from '../../state';
import { emptyClientState, initialClientState } from '../../state';
import { zoomCameraCameraReducer } from './zoom-camera';
import { emptyServerState } from '../../../../../common/src/state';
import { updateStateCameraReducer } from './update-state';

describe('zoomCameraCameraReducer', () => {
    it('handles update state event', () => {
        const serverState = {
            ...emptyServerState,
            world: {
                ...emptyServerState.world,
                size: {
                    x: 10,
                    y: 10,
                },
            },
        };

        const action = updateState({ serverState });

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const expected: ClientStateCamera = {
            ...initialClientState.camera,
            locationLimit: {
                min: {
                    x: -672,
                    y: -672,
                },
                max: {
                    x: 672,
                    y: 672,
                },
            },
        };

        const actual = updateStateCameraReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });
        expect(actual).toEqual(expected);
    });
});
