// @flow

import { moveCameraUp } from '../../actions';
import type { ClientState, ClientStateCamera } from '../../state';
import { emptyClientState } from '../../state';
import { moveCameraCameraReducer } from './move-camera';

describe('moveCameraCameraReducer', () => {
    it('handles move camera up event', () => {
        const action = moveCameraUp();

        const previousGlobalState: ClientState = {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        ...emptyClientState.camera.geometry.location,
                        x: 50,
                        y: 50,
                    },
                    size: {
                        ...emptyClientState.camera.geometry.size,
                        x: 100,
                        y: 100,
                    },
                },
                locationLimit: {
                    ...emptyClientState.camera.locationLimit,
                    min: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.locationLimit.min,
                        x: 100,
                        y: 100,
                    },
                },
                movementSpeed: {
                    ...emptyClientState.camera.movementSpeed,
                    x: 0.1,
                    y: 0.1,
                },
            },
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const expected: ClientStateCamera = {
            ...previousLocalState,
            geometry: {
                ...previousLocalState.geometry,
                location: {
                    ...previousLocalState.geometry.location,
                    y: 40,
                },
            },
        };

        const actual = moveCameraCameraReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
