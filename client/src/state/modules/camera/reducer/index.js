// @flow

import { moveCameraCameraReducer } from './move-camera';
import { zoomCameraCameraReducer } from './zoom-camera';
import { updateStateCameraReducer } from './update-state';
import type { ClientStateCamera } from './types';
import { MOVE_CAMERA, ZOOM_CAMERA } from '../actions/types';
import { UPDATE_STATE } from '../../common-state/actions/types';
import { createClientStateReducer } from '../../utils';
import { initialClientState } from '../../state';


export const cameraReducer = createClientStateReducer<ClientStateCamera>({
    actionReducers: {
        [MOVE_CAMERA]: moveCameraCameraReducer,
        [UPDATE_STATE]: updateStateCameraReducer,
        [ZOOM_CAMERA]: zoomCameraCameraReducer,
    },
    initialState: initialClientState.camera,
});
