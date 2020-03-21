// @flow

import type { ClientActionCreator } from '../../../actions/types';
import type { CommonStateBuildingKey } from '../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    CommonState,
} from '../../../../../../common/src/state/modules/types';
import type { BaseAction } from '../../../../../../common/src/types/actions';

export const REQUEST_BUILDING_UPGRADE: 'REQUEST_BUILDING_UPGRADE' = 'REQUEST_BUILDING_UPGRADE';
export const REQUEST_CITY_CREATION: 'REQUEST_CITY_CREATION' = 'REQUEST_CITY_CREATION';
export const REQUEST_CITY_NAME_CHANGE: 'REQUEST_CITY_NAME_CHANGE' = 'REQUEST_CITY_NAME_CHANGE';
export const UPDATE_STATE: 'UPDATE_STATE' = 'UPDATE_STATE';


export type ClientUpdateStateAction = BaseAction<typeof UPDATE_STATE, $ReadOnly<{ commonState: CommonState }>>;
export type ClientRequestBuildingUpgradeAction = BaseAction<typeof REQUEST_BUILDING_UPGRADE, $ReadOnly<{ cityId: string, buildingType: CommonStateBuildingKey, }>>
export type ClientRequestCityCreationAction = BaseAction<typeof REQUEST_CITY_CREATION, $ReadOnly<{ name: string, }>>
export type ClientRequestCityNameChangeAction = BaseAction<typeof REQUEST_CITY_NAME_CHANGE, $ReadOnly<{ cityId: string, name: string, }>>


export const requestBuildingUpgrade: ClientActionCreator<ClientRequestBuildingUpgradeAction> = (payload) => {
    return {
        type: REQUEST_BUILDING_UPGRADE,
        payload,
    };
};

export const requestCityCreation: ClientActionCreator<ClientRequestCityCreationAction> = (payload) => {
    return {
        type: REQUEST_CITY_CREATION,
        payload,
    };
};

export const requestCityNameChange: ClientActionCreator<ClientRequestCityNameChangeAction> = (payload) => {
    return {
        type: REQUEST_CITY_NAME_CHANGE,
        payload,
    };
};

export const updateState: ClientActionCreator<ClientUpdateStateAction> = (payload) => {
    return {
        type: UPDATE_STATE,
        payload,
    };
};

