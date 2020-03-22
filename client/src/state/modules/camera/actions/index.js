// @flow


import type { ClientActionCreator } from '../../../types';
import type { ClientMoveCameraAction, ClientZoomCameraAction } from './types';
import { MOVE_CAMERA, ZOOM_CAMERA } from './types';


const moveCamera: ClientActionCreator<ClientMoveCameraAction> = (payload) => {
    return {
        type: MOVE_CAMERA,
        payload,
    };
};

const zoomCamera: ClientActionCreator<ClientZoomCameraAction> = (payload) => {
    return {
        type: ZOOM_CAMERA,
        payload,
    };
};


export const moveCameraUp = () => {
    return moveCamera({
        vector: {
            x: 0,
            y: -1,
        },
    });
};

export const moveCameraDown = () => {
    return moveCamera({
        vector: {
            x: 0,
            y: +1,
        },
    });
};

export const moveCameraLeft = () => {
    return moveCamera({
        vector: {
            x: -1,
            y: 0,
        },
    });
};

export const moveCameraRight = () => {
    return moveCamera({
        vector: {
            x: +1,
            y: 0,
        },
    });
};

export const zoomCameraIn = () => {
    return zoomCamera({
        vector: {
            x: -1,
            y: -1,
        },
    });
};

export const zoomCameraOut = () => {
    return zoomCamera({
        vector: {
            x: +1,
            y: +1,
        },
    });
};
