// @flow

import type { ClientState, ClientStateCamera } from '../../state';
import { initialClientState } from '../../state';
import type { ClientAction } from '../../actions';
import { MOVE_CAMERA, UPDATE_STATE, ZOOM_CAMERA } from '../../actions';
import { moveCameraCameraReducer } from './move-camera';
import { zoomCameraCameraReducer } from './zoom-camera';
import { updateStateCameraReducer } from './update-state';
import { unsupportedActionReducer } from '../unsupported-action-reducer';

export const cameraReducer = (
    localState: ClientStateCamera = initialClientState.camera,
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
