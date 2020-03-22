// @flow

import type { ClientDummyAction } from './actions/types';
import type { ClientReportErrorsAction } from './modules/errors/actions/types';
import type {
    ClientMoveCameraAction,
    ClientZoomCameraAction,
} from './modules/camera/actions/types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction, ClientUpdateStateAction,
} from './modules/common-state/actions/types';
import type {
    ClientCloseAttackViewAction,
    ClientCloseCityViewAction,
    ClientOpenAttackViewAction,
    ClientOpenCityViewAction,
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewResourceTabAction, ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitsTabAction,
} from './modules/menu/actions/types';
import type { ClientLoadPlayerAction } from './modules/player/actions/types';

export type ClientAction =
    | ClientCloseAttackViewAction
    | ClientCloseCityViewAction
    | ClientDummyAction
    | ClientLoadPlayerAction
    | ClientMoveCameraAction
    | ClientOpenAttackViewAction
    | ClientOpenCityViewAction
    | ClientReportErrorsAction
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

export type ClientActionCreator<A: ClientAction> = ($PropertyType<A, 'payload'>) => A;
