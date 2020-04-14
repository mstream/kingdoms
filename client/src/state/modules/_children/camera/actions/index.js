// @flow

import type {
    ClientActionCreator,
} from '../../../../types';
import type {
    ClientMoveCameraAction, ClientZoomCameraAction,
} from './types';
import {
    MOVE_CAMERA, ZOOM_CAMERA,
} from './types';

const moveCamera: ClientActionCreator< ClientMoveCameraAction > = (
    payload,
) => {

    return {
        payload,
        type: MOVE_CAMERA,
    };

};

const zoomCamera: ClientActionCreator< ClientZoomCameraAction > = (
    payload,
) => {

    return {
        payload,
        type: ZOOM_CAMERA,
    };

};

const moveCameraUp = () => {

    return moveCamera(
        {
            vector: {
                x: 0,
                y: -1,
            },
        },
    );

};

const moveCameraDown = () => {

    return moveCamera(
        {
            vector: {
                x: 0,
                y: +1,
            },
        },
    );

};

const moveCameraLeft = () => {

    return moveCamera(
        {
            vector: {
                x: -1,
                y: 0,
            },
        },
    );

};

const moveCameraRight = () => {

    return moveCamera(
        {
            vector: {
                x: +1,
                y: 0,
            },
        },
    );

};

const zoomCameraIn = () => {

    return zoomCamera(
        {
            vector: {
                x: -1,
                y: -1,
            },
        },
    );

};

const zoomCameraOut = () => {

    return zoomCamera(
        {
            vector: {
                x: +1,
                y: +1,
            },
        },
    );

};

export const cameraActions = {
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    zoomCameraIn,
    zoomCameraOut,
};
