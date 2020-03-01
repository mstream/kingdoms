// @flow

import type {ServerState} from '../../../common/src/state';
import type {Vector} from '../../../common/src/vector';

export type ClientLoadPlayerActionPayload = {
    name: string
};

export type ClientLoadPlayerAction = {
    type: 'LOAD_PLAYER',
    payload: ClientLoadPlayerActionPayload,
};

export type ClientUpdateStateActionPayload = {
    serverState: ServerState
};

export type ClientUpdateStateAction = {
    type: 'UPDATE_STATE',
    payload: ClientUpdateStateActionPayload,
};

export type ClientMoveCameraActionPayload = {
    vector: Vector
}

export type ClientMoveCameraAction = {
    type: 'MOVE_CAMERA',
    payload: ClientMoveCameraActionPayload,
};

export type ClientZoomCameraActionPayload = {
    vector: Vector
}

export type ClientZoomCameraAction = {
    type: 'ZOOM_CAMERA',
    payload: ClientZoomCameraActionPayload,
};

export type  ClientOpenCityViewActionPayload = {
    cityId: string
};

export type ClientOpenCityViewAction = {
    type: 'OPEN_CITY_VIEW',
    payload: ClientOpenCityViewActionPayload,
};

export type ClientCloseCityViewAction = {
    type: 'CLOSE_CITY_VIEW'
};

export type ClientNavigateToNextCityAction = {
    type: 'NAVIGATE_TO_NEXT_CITY',
};

export type ClientNavigateToPreviousCityAction = {
    type: 'NAVIGATE_TO_PREVIOUS_CITY',
};

export type ClientRequestBuildingUpgradeActionPayload = {
    cityId: string,
    buildingType: string,
}

export type ClientRequestBuildingUpgradeAction = {
    type: 'REQUEST_BUILDING_UPGRADE',
    payload: ClientRequestBuildingUpgradeActionPayload,
};

export type ClientRequestCityNameChangeActionPayload = {
    cityId: string,
    name: string,
}

export type ClientRequestCityNameChangeAction = {
    type: 'REQUEST_CITY_NAME_CHANGE',
    payload: ClientRequestCityNameChangeActionPayload,
};

export type ClientRequestCityCreationActionPayload = {
    name: string,
}

export type ClientRequestCityCreationAction = {
    type: 'REQUEST_CITY_CREATION',
    payload: ClientRequestCityCreationActionPayload,
};


export type ClientSucceedBuildingUpgradePayload = {
    cityId: string,
    buildingType: string,
}

export type ClientSucceedBuildingUpgrade = {
    type: 'SUCCEED_BUILDING_UPGRADE',
    payload: ClientSucceedBuildingUpgradePayload,
};

export type ClientFailBuildingUpgradePayload = string;

export type ClientFailBuildingUpgrade = {
    type: 'FAIL_BUILDING_UPGRADE',
    payload: ClientFailBuildingUpgradePayload,
};


export type ClientAction =
    | ClientLoadPlayerAction
    | ClientUpdateStateAction
    | ClientMoveCameraAction
    | ClientZoomCameraAction
    | ClientOpenCityViewAction
    | ClientCloseCityViewAction
    | ClientNavigateToNextCityAction
    | ClientNavigateToPreviousCityAction
    | ClientRequestBuildingUpgradeAction
    | ClientSucceedBuildingUpgrade
    | ClientFailBuildingUpgrade
    | ClientRequestCityCreationAction

type ActionCreator<A> = () => A;
type PayloadActionCreator<A, P> = (P) => A;

export type ClientLoadPlayerActionCreator = PayloadActionCreator<ClientLoadPlayerAction, ClientLoadPlayerActionPayload>
export type ClientUpdateStateActionCreator = PayloadActionCreator<ClientUpdateStateAction, ClientUpdateStateActionPayload>
export type ClientMoveCameraActionCreator = ActionCreator<ClientMoveCameraAction>
export type ClientZoomCameraActionCreator = ActionCreator<ClientZoomCameraAction>
export type ClientOpenCityViewActionCreator = PayloadActionCreator<ClientOpenCityViewAction, ClientOpenCityViewActionPayload>
export type ClientCloseCityViewActionCreator = ActionCreator<ClientCloseCityViewAction>
export type ClientNavigateToNextCityActionCreator = ActionCreator<ClientNavigateToNextCityAction>
export type ClientNavigateToPreviousCityActionCreator = ActionCreator<ClientNavigateToPreviousCityAction>
export type ClientRequestBuildingUpgradeActionCreator = PayloadActionCreator<ClientRequestBuildingUpgradeAction, ClientRequestBuildingUpgradeActionPayload>
export type ClientRequestCityNameChangeActionCreator = PayloadActionCreator<ClientRequestCityNameChangeAction, ClientRequestCityNameChangeActionPayload>
export type ClientRequestCityCreationActionCreator = PayloadActionCreator<ClientRequestCityCreationAction, ClientRequestCityCreationActionPayload>

export const loadPlayer: ClientLoadPlayerActionCreator = (payload) => {
    return {
        type: 'LOAD_PLAYER',
        payload,
    };
};

export const updateState: ClientUpdateStateActionCreator = (payload) => {
    return {
        type: 'UPDATE_STATE',
        payload,
    };
};

const moveCamera: PayloadActionCreator<ClientMoveCameraAction, ClientMoveCameraActionPayload> = (payload) => {
    return {
        type: 'MOVE_CAMERA',
        payload,
    };
};

const zoomCamera: PayloadActionCreator<ClientZoomCameraAction, ClientZoomCameraActionPayload> = (payload) => {
    return {
        type: 'ZOOM_CAMERA',
        payload,
    };
};

export const moveCameraUp: ClientMoveCameraActionCreator = () => {
    return moveCamera({
        vector: {
            x: 0,
            y: -1,
        },
    });
};

export const moveCameraDown: ClientMoveCameraActionCreator = () => {
    return moveCamera({
        vector: {
            x: 0,
            y: +1,
        },
    });
};

export const moveCameraLeft: ClientMoveCameraActionCreator = () => {
    return moveCamera({
        vector: {
            x: -1,
            y: 0,
        },
    });
};

export const moveCameraRight: ClientMoveCameraActionCreator = () => {
    return moveCamera({
        vector: {
            x: +1,
            y: 0,
        },
    });
};

export const zoomCameraIn: ClientZoomCameraActionCreator = () => {
    return zoomCamera({
        vector: {
            x: -1,
            y: -1,
        },
    });
};

export const zoomCameraOut: ClientZoomCameraActionCreator = () => {
    return zoomCamera({
        vector: {
            x: +1,
            y: +1,
        },
    });
};

export const openCityView: ClientOpenCityViewActionCreator = (payload) => {
    return {
        type: 'OPEN_CITY_VIEW',
        payload,
    };
};

export const closeCityView: ClientCloseCityViewActionCreator = () => {
    return {
        type: 'CLOSE_CITY_VIEW',
    };
};

export const navigateToNextCity: ClientNavigateToNextCityActionCreator = () => {
    return {
        type: 'NAVIGATE_TO_NEXT_CITY',
    };
};

export const navigateToPreviousCity: ClientNavigateToPreviousCityActionCreator = () => {
    return {
        type: 'NAVIGATE_TO_PREVIOUS_CITY',
    };
};

export const requestBuildingUpgrade: ClientRequestBuildingUpgradeActionCreator = (payload) => {
    return {
        type: 'REQUEST_BUILDING_UPGRADE',
        payload,
    };
};

export const requestCityNameChange: ClientRequestCityNameChangeActionCreator = (payload) => {
    return {
        type: 'REQUEST_CITY_NAME_CHANGE',
        payload,
    };
};

export const requestCityCreation: ClientRequestCityCreationActionCreator = (payload) => {
    return {
        type: 'REQUEST_CITY_CREATION',
        payload,
    };
};
