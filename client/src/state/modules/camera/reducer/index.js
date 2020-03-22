// @flow

import { moveCameraCameraReducer } from './move-camera';
import { zoomCameraCameraReducer } from './zoom-camera';
import { updateStateCameraReducer } from './update-state';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import type { ClientStateCamera } from './types';
import type { ClientState } from '../../types';
import type { ClientAction } from '../../../types';
import { MOVE_CAMERA, ZOOM_CAMERA } from '../actions/types';
import { UPDATE_STATE } from '../../common-state/actions/types';
import { initialCameraState } from './state';

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
