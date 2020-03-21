// @flow


import type { Vector } from '../../../../../../common/src/vector';
import type { ClientActionCreator } from '../../../actions/types';
import type { BaseAction } from '../../../../../../common/src/types/actions';

export const MOVE_CAMERA: 'MOVE_CAMERA' = 'MOVE_CAMERA';
export const ZOOM_CAMERA: 'ZOOM_CAMERA' = 'ZOOM_CAMERA';

export type ClientMoveCameraAction = BaseAction<typeof MOVE_CAMERA, $ReadOnly<{ vector: Vector }>>;
export type ClientZoomCameraAction = BaseAction<typeof ZOOM_CAMERA, $ReadOnly<{ vector: Vector }>>;


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
