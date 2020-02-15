/**
 * @flow
 */

import type {CameraMovedAction, CameraZoomedAction} from './types';
import type {Vector} from '../../common/src/types';

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

export const openCityView = ({cityId}: { cityId: string }) => {
    return {
        type: 'CITY_VIEW_OPENED',
        payload: cityId
    };
};

export const closeCityView = () => {
    return {
        type: 'CITY_VIEW_CLOSED'
    };
};