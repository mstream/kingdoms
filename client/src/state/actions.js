/**
 * @flow
 */

import type { ServerState, Vector } from '../../../common/src/types';

export type ServerStateUpdated = {
    type: 'SERVER_STATE_UPDATED',
    payload: ServerState,
};

export type CameraMovedAction = {
    type: 'CAMERA_MOVED',
    payload: Vector,
};

export type CameraZoomedAction = {
    type: 'CAMERA_ZOOMED',
    payload: Vector,
};

export type CityViewOpenedAction = {
    type: 'CITY_VIEW_OPENED',
    payload: string,
};

export type CityViewClosedAction = {
    type: 'CITY_VIEW_CLOSED',
};

export type NavigatedToNextCityAction = {
    type: 'NAVIGATED_TO_NEXT_CITY',
    payload: string,
};

export type NavigatedToPreviousCityAction = {
    type: 'NAVIGATED_TO_PREVIOUS_CITY',
    payload: string,
};

export type ClientAction =
    | ServerStateUpdated
    | CameraMovedAction
    | CameraZoomedAction
    | CityViewOpenedAction
    | CityViewClosedAction
    | NavigatedToNextCityAction
    | NavigatedToPreviousCityAction;

const moveCamera = ({
    direction,
}: {
    direction: Vector,
}): CameraMovedAction => {
    return {
        type: 'CAMERA_MOVED',
        payload: direction,
    };
};

const zoomCamera = ({
    direction,
}: {
    direction: Vector,
}): CameraZoomedAction => {
    return {
        type: 'CAMERA_ZOOMED',
        payload: direction,
    };
};

export const moveCameraUp = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: 0,
            y: -1,
        },
    });
};

export const moveCameraDown = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: 0,
            y: +1,
        },
    });
};

export const moveCameraLeft = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: -1,
            y: 0,
        },
    });
};

export const moveCameraRight = (): CameraMovedAction => {
    return moveCamera({
        direction: {
            x: +1,
            y: 0,
        },
    });
};

export const zoomCameraIn = (): CameraZoomedAction => {
    return zoomCamera({
        direction: {
            x: -1,
            y: -1,
        },
    });
};

export const zoomCameraOut = (): CameraZoomedAction => {
    return zoomCamera({
        direction: {
            x: +1,
            y: +1,
        },
    });
};

export const openCityView = ({
    cityId,
}: {
    cityId: string,
}): CityViewOpenedAction => {
    return {
        type: 'CITY_VIEW_OPENED',
        payload: cityId,
    };
};

export const closeCityView = (): CityViewClosedAction => {
    return {
        type: 'CITY_VIEW_CLOSED',
    };
};

export const navigateToNextCity = ({
    currentCityId,
}: {
    currentCityId: string,
}) => {
    return {
        type: 'NAVIGATED_TO_NEXT_CITY',
        payload: currentCityId,
    };
};

export const navigateToPreviousCity = ({
    currentCityId,
}: {
    currentCityId: string,
}) => {
    return {
        type: 'NAVIGATED_TO_PREVIOUS_CITY',
        payload: currentCityId,
    };
};
