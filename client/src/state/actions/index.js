// @flow

import type { ClientActionCreator, ClientBaseAction } from '../modules/types';
import type {
    ClientMoveCameraAction,
    ClientZoomCameraAction,
} from '../modules/camera/actions';
import type { ClientLoadPlayerAction } from '../modules/player/actions';
import type {
    ClientCloseAttackViewAction,
    ClientCloseCityViewAction,
    ClientOpenAttackViewAction,
    ClientOpenCityViewAction,
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewResourceTabAction,
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitsTabAction,
} from '../modules/menu/actions';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientUpdateStateAction,
} from '../modules/common-state/actions';


export const DUMMY: 'DUMMY' = 'DUMMY';
export type ClientDummyAction = ClientBaseAction<typeof DUMMY, void>;

export const dummy: ClientActionCreator<ClientDummyAction> = (payload) => {
    return {
        type: DUMMY,
        payload,
    };
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
    | ClientRequestCityNameChangeAction
    | ClientSelectAttackViewAttackingCityAction
    | ClientSelectCityViewBuildingsTabAction
    | ClientSelectCityViewResourceTabAction
    | ClientSelectCityViewUnitsTabAction
    | ClientSelectCityViewTabAction
    | ClientUpdateStateAction
    | ClientZoomCameraAction
