// @flow

import {
    MOVE_CAMERA, ZOOM_CAMERA,
} from '../actions/types';
import {
    UPDATE_STATE,
} from '../../common-state/actions/types';
import {
    createClientStateReducer,
} from '../../../../utils';
import {
    initialClientState,
} from '../../../../state';
import {
    moveCameraCameraReducer,
} from './_impl/move-camera';
import {
    updateStateCameraReducer,
} from './_impl/update-state';
import {
    zoomCameraCameraReducer,
} from './_impl/zoom-camera';
import type {
    ClientStateCamera,
} from './types';

export const cameraReducer = createClientStateReducer<ClientStateCamera>(
    {
        actionReducers: {
            [ MOVE_CAMERA ] : moveCameraCameraReducer,
            [ UPDATE_STATE ]: updateStateCameraReducer,
            [ ZOOM_CAMERA ] : zoomCameraCameraReducer,
        },
        initialState: initialClientState.camera,
    },
);
