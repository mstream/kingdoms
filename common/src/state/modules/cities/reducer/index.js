// @flow


import { resetStateCitiesReducer } from './reset-state';
import { abandonCityCitiesReducer } from './abandon-city';
import { changeCityNameCitiesReducer } from './change-city-name';
import { upgradeBuildingCitiesReducer } from './upgrade-building';
import { executeTimeStepCitiesReducer } from './execute-time-step';
import { createCityCitiesReducer } from './create-city';
import type { CommonStateCities } from './types';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { emptyCitiesState } from './state';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../actions';
import { EXECUTE_TIME_STEP } from '../../time/actions';
import type { CommonAction } from '../../../actions/types';
import { RESET_STATE } from '../../../actions/types';

export const initialCitiesState = emptyCitiesState;

export const citiesReducer = (
    localState: CommonStateCities = initialCitiesState,
    action: CommonAction,
    globalState: CommonState,
): CommonStateReducerResult<CommonStateCities> => {
    switch (action.type) {
        case ABANDON_CITY: {
            return abandonCityCitiesReducer({
                action,
                globalState,
                localState,
            });
        }
        case CHANGE_CITY_NAME: {
            return changeCityNameCitiesReducer({
                action,
                globalState,
                localState,
            });
        }
        case CREATE_CITY: {
            return createCityCitiesReducer({
                action,
                globalState,
                localState,
            });
        }
        case EXECUTE_TIME_STEP: {
            return executeTimeStepCitiesReducer({
                action,
                globalState,
                localState,
            });
        }
        case RESET_STATE: {
            return resetStateCitiesReducer({
                action,
                globalState,
                localState,
            });
        }
        case UPGRADE_BUILDING: {
            return upgradeBuildingCitiesReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};

