/**
 * @flow
 */

import type {CameraMovedAction, CameraZoomedAction, Vector} from './types';

const moveCamera = ({direction}: { direction: Vector }): CameraMovedAction => {
    return {
        type: 'CAMERA_MOVED',
        payload: direction
    };
};

const zoomCamera = ({direction}: { direction: Vector }): CameraZoomedAction => {
    return {
        type: 'CAMERA_ZOOMED',
        payload: direction
    };
};

export const moveCameraUp = () => moveCamera({direction: {x: 0, y: -1}});
export const moveCameraDown = () => moveCamera({direction: {x: 0, y: +1}});
export const moveCameraLeft = () => moveCamera({direction: {x: -1, y: 0}});
export const moveCameraRight = () => moveCamera({direction: {x: +1, y: 0}});

export const zoomCameraIn = () => zoomCamera({direction: {x: -1, y: -1}});
export const zoomCameraOut = () => zoomCamera({direction: {x: +1, y: +1}});

