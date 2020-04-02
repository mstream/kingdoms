// @flow

import { abandonCityCitiesReducer } from './abandon-city';
import { changeCityNameCitiesReducer } from './change-city-name';
import { upgradeBuildingCitiesReducer } from './upgrade-building';
import { executeTimeStepCitiesReducer } from './execute-time-step';
import { createCityCitiesReducer } from './create-city';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../actions/types';
import { EXECUTE_TIME_STEP } from '../../time/actions';
import { RESET_STATE } from '../../../actions/types';
import { CREATE_SCHEDULED_ATTACK_ORDER } from '../../orders/actions/types';
import { createScheduledAttackOrderCitiesReducer } from './create-order';
import { resetStateCitiesReducer } from './reset-state';
import { createCommonStateReducer } from '../../utils';
import { initialCommonState } from '../../../index';
import type { CommonStateCities } from './types';

export const citiesReducer = createCommonStateReducer<CommonStateCities>({
    actionReducers: {
        [ABANDON_CITY]: abandonCityCitiesReducer,
        [CHANGE_CITY_NAME]: changeCityNameCitiesReducer,
        [CREATE_CITY]: createCityCitiesReducer,
        [CREATE_SCHEDULED_ATTACK_ORDER]: createScheduledAttackOrderCitiesReducer,
        [EXECUTE_TIME_STEP]: executeTimeStepCitiesReducer,
        [RESET_STATE]: resetStateCitiesReducer,
        [UPGRADE_BUILDING]: upgradeBuildingCitiesReducer,
    },
    initialState: initialCommonState.cities,
});
