/**
 * @flow
 */

import type {
    CameraMovedAction,
    CameraZoomedAction,
    CityViewClosedAction,
    CityViewOpenedAction
} from './types';
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

export const moveCameraUp = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: 0,
            y: -1
        }
    });
};

export const moveCameraDown = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: 0,
            y: +1
        }
    });
};

export const moveCameraLeft = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: -1,
            y: 0
        }
    });
};

export const moveCameraRight = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: +1,
            y: 0
        }
    });
};

export const zoomCameraIn = (): CameraZoomedAction => {
    return zoomCamera({
        direction: {
            x: -1,
            y: -1
        }
    });
};

export const zoomCameraOut = (): CameraZoomedAction => {
    return zoomCamera({
        direction: {
            x: +1,
            y: +1
        }
    });
};

export const openCityView = ({cityId}: { cityId: string }): CityViewOpenedAction => {
    return {
        type: 'CITY_VIEW_OPENED',
        payload: cityId
    };
};

export const closeCityView = (): CityViewClosedAction => {
    return {
        type: 'CITY_VIEW_CLOSED'
    };
};