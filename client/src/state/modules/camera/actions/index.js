// @flow


import type { ClientActionCreator, ClientBaseAction } from '../../types';
import type { Vector } from '../../../../../../common/src/vector';

export const MOVE_CAMERA: 'MOVE_CAMERA' = 'MOVE_CAMERA';
export const ZOOM_CAMERA: 'ZOOM_CAMERA' = 'ZOOM_CAMERA';

export type ClientMoveCameraAction = ClientBaseAction<typeof MOVE_CAMERA, $ReadOnly<{ vector: Vector }>>;
export type ClientZoomCameraAction = ClientBaseAction<typeof ZOOM_CAMERA, $ReadOnly<{ vector: Vector }>>;


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
