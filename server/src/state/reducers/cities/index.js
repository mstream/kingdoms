/**
 * @flow
 */


import {resetStateCitiesReducer} from './reset-state';
import {abandonCityCitiesReducer} from './abandon-city';
import {changeCityNameCitiesReducer} from './change-city-name';
import {upgradeBuildingCitiesReducer} from './upgrade-building';
import {executeTimeStepCitiesReducer} from './execute-time-step';
import type {ServerStateReducer} from '../root';
import type {CommonStateCities} from '../../../../../common/src/state';
import {unsupportedActionCitiesReducer} from './unsupported';

export const citiesReducer: ServerStateReducer<CommonStateCities> = ({action, state}) => {
    switch (action.type) {
        case 'ABANDON_CITY': {
            return abandonCityCitiesReducer({action, state});
        }
        case 'CHANGE_CITY_NAME': {
            return changeCityNameCitiesReducer({action, state});
        }
        case 'EXECUTE_TIME_STEP': {
            return executeTimeStepCitiesReducer({action, state});
        }
        case 'RESET_STATE': {
            return resetStateCitiesReducer({action, state});
        }
        case 'UPGRADE_BUILDING': {
            return upgradeBuildingCitiesReducer({action, state});
        }
        default: {
            return unsupportedActionCitiesReducer({action, state});
        }
    }
};

