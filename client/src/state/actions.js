// @flow

import type { Vector } from '../../../common/src/vector';
import type {
    BuildingType,
    CommonState,
    CommonStateUnits,
} from '../../../common/src/state';
import type { ClientStateCityViewTab } from './modules/menu/reducer/types';


type BaseAction<T, P> = $ReadOnly<{
    type: T,
    payload: P,
}>;

type ActionCreator<A> = ($PropertyType<A, 'payload'>) => A;


export const DUMMY: 'DUMMY' = 'DUMMY';
export type ClientDummyAction = BaseAction<typeof DUMMY, void>;

export const dummy: ActionCreator<ClientDummyAction> = (payload) => {
    return {
        type: DUMMY,
        payload,
    };
};


export const CLOSE_ATTACK_VIEW: 'CLOSE_ATTACK_VIEW' = 'CLOSE_ATTACK_VIEW';
export type ClientCloseAttackViewAction = BaseAction<typeof CLOSE_ATTACK_VIEW, void>;

export const closeAttackView: ActionCreator<ClientCloseAttackViewAction> = () => {
    return {
        type: CLOSE_ATTACK_VIEW, payload: undefined,
    };
};


export const OPEN_ATTACK_VIEW: 'OPEN_ATTACK_VIEW' = 'OPEN_ATTACK_VIEW';
export type ClientOpenAttackViewAction = BaseAction<typeof OPEN_ATTACK_VIEW, $ReadOnly<{ cityId: string, }>>;


export const CLOSE_CITY_VIEW: 'CLOSE_CITY_VIEW' = 'CLOSE_CITY_VIEW';
export type ClientCloseCityViewAction = BaseAction<typeof CLOSE_CITY_VIEW, void>;

export const closeCityView: ActionCreator<ClientCloseCityViewAction> = () => {
    return {
        type: CLOSE_CITY_VIEW, payload: undefined,
    };
};


export const OPEN_CITY_VIEW: 'OPEN_CITY_VIEW' = 'OPEN_CITY_VIEW';
export type ClientOpenCityViewAction = BaseAction<typeof OPEN_CITY_VIEW, $ReadOnly<{ cityId: string, }>>;


export const SELECT_CITY_VIEW_TAB: 'SELECT_CITY_VIEW_TAB' = 'SELECT_CITY_VIEW_TAB';
export type ClientSelectCityViewTabAction = BaseAction<typeof SELECT_CITY_VIEW_TAB, $ReadOnly<{ tab: ClientStateCityViewTab, }>>;

export const selectCityViewTab: ActionCreator<ClientSelectCityViewTabAction> = (payload) => {
    return {
        type: SELECT_CITY_VIEW_TAB,
        payload,
    };
};

export const SELECT_CITY_VIEW_UNIT: 'SELECT_CITY_VIEW_UNIT' = 'SELECT_CITY_VIEW_UNIT';
export type ClientSelectCityViewUnitAction = BaseAction<typeof SELECT_CITY_VIEW_UNIT, $ReadOnly<{ unitType: $Keys<CommonStateUnits>, }>>;

export const selectCityViewUnit: ActionCreator<ClientSelectCityViewUnitAction> = (payload) => {
    return {
        type: SELECT_CITY_VIEW_UNIT,
        payload,
    };
};

export const LOAD_PLAYER: 'LOAD_PLAYER' = 'LOAD_PLAYER';
export type ClientLoadPlayerAction = BaseAction<typeof LOAD_PLAYER, $ReadOnly<{ name: string, }>>

export const loadPlayer: ActionCreator<ClientLoadPlayerAction> = (payload) => {
    return {
        type: LOAD_PLAYER,
        payload,
    };
};


export const UPDATE_STATE: 'UPDATE_STATE' = 'UPDATE_STATE';
export type ClientUpdateStateAction = BaseAction<typeof UPDATE_STATE, $ReadOnly<{ commonState: CommonState }>>;

export const updateState: ActionCreator<ClientUpdateStateAction> = (payload) => {
    return {
        type: UPDATE_STATE,
        payload,
    };
};


export const REQUEST_BUILDING_UPGRADE: 'REQUEST_BUILDING_UPGRADE' = 'REQUEST_BUILDING_UPGRADE';
export type ClientRequestBuildingUpgradeAction = BaseAction<typeof REQUEST_BUILDING_UPGRADE, $ReadOnly<{ cityId: string, buildingType: BuildingType, }>>

export const requestBuildingUpgrade: ActionCreator<ClientRequestBuildingUpgradeAction> = (payload) => {
    return {
        type: REQUEST_BUILDING_UPGRADE,
        payload,
    };
};


export const openAttackView: ActionCreator<ClientOpenAttackViewAction> = (payload) => {
    return {
        type: OPEN_ATTACK_VIEW,
        payload,
    };
};


export const openCityView: ActionCreator<ClientOpenCityViewAction> = (payload) => {
    return {
        type: OPEN_CITY_VIEW,
        payload,
    };
};


export const REQUEST_CITY_NAME_CHANGE: 'REQUEST_CITY_NAME_CHANGE' = 'REQUEST_CITY_NAME_CHANGE';
export type ClientRequestCityNameChangeAction = BaseAction<typeof REQUEST_CITY_NAME_CHANGE, $ReadOnly<{ cityId: string, name: string, }>>

export const requestCityNameChange: ActionCreator<ClientRequestCityNameChangeAction> = (payload) => {
    return {
        type: REQUEST_CITY_NAME_CHANGE,
        payload,
    };
};


export const REQUEST_CITY_CREATION: 'REQUEST_CITY_CREATION' = 'REQUEST_CITY_CREATION';
export type ClientRequestCityCreationAction = BaseAction<typeof REQUEST_CITY_CREATION, $ReadOnly<{ name: string, }>>

export const requestCityCreation: ActionCreator<ClientRequestCityCreationAction> = (payload) => {
    return {
        type: REQUEST_CITY_CREATION,
        payload,
    };
};


export const MOVE_CAMERA: 'MOVE_CAMERA' = 'MOVE_CAMERA';
export type ClientMoveCameraAction = BaseAction<typeof MOVE_CAMERA, $ReadOnly<{ vector: Vector }>>;

const moveCamera: ActionCreator<ClientMoveCameraAction> = (payload) => {
    return {
        type: MOVE_CAMERA,
        payload,
    };
};


export const ZOOM_CAMERA: 'ZOOM_CAMERA' = 'ZOOM_CAMERA';
export type ClientZoomCameraAction = BaseAction<typeof ZOOM_CAMERA, $ReadOnly<{ vector: Vector }>>;


const zoomCamera: ActionCreator<ClientZoomCameraAction> = (payload) => {
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


export type ClientAction =
    | ClientCloseAttackViewAction
    | ClientCloseCityViewAction
    | ClientDummyAction
    | ClientLoadPlayerAction
    | ClientMoveCameraAction
    | ClientOpenAttackViewAction
    | ClientOpenCityViewAction
    | ClientRequestBuildingUpgradeAction
    | ClientRequestCityCreationAction
    | ClientSelectCityViewUnitAction
    | ClientSelectCityViewTabAction
    | ClientUpdateStateAction
    | ClientZoomCameraAction
