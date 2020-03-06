// @flow

import { zoomCameraIn } from '../../actions';
import type { ClientState, ClientStateCamera } from '../../state';
import { emptyClientState } from '../../state';
import { zoomCameraCameraReducer } from './zoom-camera';

describe('zoomCameraCameraReducer', () => {
    it('handles zoom camera in event', () => {
        const action = zoomCameraIn();

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
                sizeLimit: {
                    ...emptyClientState.camera.sizeLimit,
                    min: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 0,
                        y: 0,
                    },
                    max: {
                        ...emptyClientState.camera.sizeLimit.min,
                        x: 200,
                        y: 200,
                    },
                },
                zoomingSpeed: {
                    ...emptyClientState.camera.zoomingSpeed,
                    x: 10,
                    y: 10,
                },
            },
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const expected: ClientStateCamera = {
            ...previousLocalState,
            geometry: {
                ...previousLocalState.geometry,
                size: {
                    ...previousLocalState.geometry.size,
                    x: 90,
                    y: 90,
                },
            },
        };

        const actual = zoomCameraCameraReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });
        expect(actual).toEqual(expected);
    });
});
