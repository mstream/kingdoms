// @flow

import type { ClientDummyAction } from './actions/types';
import { DUMMY } from './actions/types';
import type { ClientReportErrorsAction } from './modules/errors/actions/types';
import { REPORT_ERRORS } from './modules/errors/actions/types';
import type {
    ClientMoveCameraAction,
    ClientZoomCameraAction,
} from './modules/camera/actions/types';
import { MOVE_CAMERA, ZOOM_CAMERA } from './modules/camera/actions/types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientUpdateStateAction,
} from './modules/common-state/actions/types';
import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    UPDATE_STATE,
} from './modules/common-state/actions/types';
import type {
    ClientCloseAttackViewAction,
    ClientCloseCityViewAction,
    ClientOpenAttackViewAction,
    ClientOpenCityViewAction,
    ClientRequestOrderCreationAction,
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewResourceTabAction,
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitsTabAction,
    ClientUpdateAttackViewMinimumDelayAction,
    ClientUpdateAttackViewRegimentTemplateAction,
} from './modules/menu/actions/types';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    REQUEST_ORDER_CREATION,
    SELECT_ATTACK_VIEW_ATTACKING_CITY,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB,
    UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from './modules/menu/actions/types';
import type { ClientLoadPlayerAction } from './modules/player/actions/types';
import { LOAD_PLAYER } from './modules/player/actions/types';

export type ClientActionKey =
    | typeof CLOSE_ATTACK_VIEW
    | typeof CLOSE_CITY_VIEW
    | typeof DUMMY
    | typeof LOAD_PLAYER
    | typeof MOVE_CAMERA
    | typeof OPEN_ATTACK_VIEW
    | typeof OPEN_CITY_VIEW
    | typeof REPORT_ERRORS
    | typeof REQUEST_BUILDING_UPGRADE
    | typeof REQUEST_CITY_CREATION
    | typeof REQUEST_CITY_NAME_CHANGE
    | typeof REQUEST_ORDER_CREATION
    | typeof SELECT_ATTACK_VIEW_ATTACKING_CITY
    | typeof SELECT_CITY_VIEW_BUILDINGS_TAB
    | typeof SELECT_CITY_VIEW_RESOURCES_TAB
    | typeof SELECT_CITY_VIEW_UNITS_TAB
    | typeof SELECT_CITY_VIEW_TAB
    | typeof UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE
    | typeof UPDATE_ATTACK_VIEW_MINIMUM_DELAY
    | typeof UPDATE_STATE
    | typeof ZOOM_CAMERA


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
    | ClientRequestOrderCreationAction
    | ClientSelectAttackViewAttackingCityAction
    | ClientSelectCityViewBuildingsTabAction
    | ClientSelectCityViewResourceTabAction
    | ClientSelectCityViewUnitsTabAction
    | ClientSelectCityViewTabAction
    | ClientUpdateAttackViewRegimentTemplateAction
    | ClientUpdateAttackViewMinimumDelayAction
    | ClientUpdateStateAction
    | ClientZoomCameraAction

export type ClientActionCreator<A: ClientAction> = ($PropertyType<A, 'payload'>) => A;
