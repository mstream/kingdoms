// @flow

import type { ClientAction } from '../../../actions';
import { moveCameraCameraReducer } from './move-camera';
import { zoomCameraCameraReducer } from './zoom-camera';
import { updateStateCameraReducer } from './update-state';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import type { ClientStateCamera } from './types';
import type { ClientState } from '../../root';
import { zeroVector } from '../../../../../../common/src/vector';
import { UPDATE_STATE } from '../../common-state/actions';
import { MOVE_CAMERA, ZOOM_CAMERA } from '../actions';

export const initialCameraState: ClientStateCamera = {
    geometry: {
        location: {
            x: 0,
            y: 0,
        },
        size: {
            x: 1280,
            y: 800,
        },
    },
    locationLimit: {
        min: zeroVector,
        max: zeroVector,
    },
    movementSpeed: {
        x: 0.1,
        y: 0.1,
    },
    sizeLimit: {
        min: { x: 640, y: 400 },
        max: { x: 3200, y: 2000 },
    },
    zoomingSpeed: {
        x: 100,
        y: 100,
    },
};

export const cameraReducer = (
    localState: ClientStateCamera = initialCameraState,
    action: ClientAction,
    globalState: ClientState,
): ClientStateCamera => {
    switch (action.type) {
        case MOVE_CAMERA: {
            return moveCameraCameraReducer({ action, localState, globalState });
        }
        case ZOOM_CAMERA: {
            return zoomCameraCameraReducer({ action, localState, globalState });
        }
        case UPDATE_STATE: {
            return updateStateCameraReducer({
                action,
                localState,
                globalState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                localState,
                globalState,
            });
        }
    }
};
