// @flow


import {resetStateCitiesReducer} from './reset-state';
import {abandonCityCitiesReducer} from './abandon-city';
import {changeCityNameCitiesReducer} from './change-city-name';
import {upgradeBuildingCitiesReducer} from './upgrade-building';
import {executeTimeStepCitiesReducer} from './execute-time-step';
import type {CommonStateReducer} from '../root';
import {unsupportedActionCitiesReducer} from './unsupported';
import type {ServerAction} from '../../../../../common/src/actions';
import {createCityCitiesReducer} from './create-city';
import type { CommonState, CommonStateCities } from '../../state';

export const citiesReducer: CommonStateReducer<CommonStateCities> = ({action, state}: {action: ServerAction, state: CommonState}) => {
    switch (action.type) {
        case 'ABANDON_CITY': {
            return abandonCityCitiesReducer({action, state});
        }
        case 'CHANGE_CITY_NAME': {
            return changeCityNameCitiesReducer({action, state});
        }
        case 'CREATE_CITY': {
            return createCityCitiesReducer({action, state});
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

