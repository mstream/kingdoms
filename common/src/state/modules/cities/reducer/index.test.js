// @flow

import { citiesReducer } from './index';
import { initialCommonState } from '../../../index';
import { runTestScenarios, success } from '../../utils';
import { emptyCommonState } from '../../state';
import type { CommonDummyAction } from '../../../actions/types';
import { RESET_STATE } from '../../../actions/types';
import { dummy } from '../../../actions';
import { DUMMY } from '../../../../../../client/src/state/actions';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    UPGRADE_BUILDING,
} from '../actions/types';
import { abandonCityTestScenarios } from './test/abandon-city-test-scenarios';
import { changeCityNameTestScenarios } from './test/change-city-name-test-scenarios';
import { CREATE_ORDER } from '../../orders/actions/types';
import { createOrderTestScenarios } from './test/create-order-test-scenarios';
import { EXECUTE_TIME_STEP } from '../../time/actions';
import { executeTimeStepTestScenarios } from './test/execute-time-step-test-scenarios';
import { upgradeBuildingTestScenarios } from './test/upgrade-building-test-scenarios';
import type { CommonStateCitiesReducerTestScenarios } from './test/types';


const stateInitializationScenario: CommonStateCitiesReducerTestScenarios<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        cities: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.cities });
    },
};


describe('citiesReducer', () => {
    runTestScenarios({
        reducer: citiesReducer,
        reducerKey: 'cities',
        scenarios: {
            [ABANDON_CITY]: abandonCityTestScenarios,
            [CHANGE_CITY_NAME]: changeCityNameTestScenarios,
            [CREATE_ORDER]: createOrderTestScenarios,
            [DUMMY]: [stateInitializationScenario],
            [EXECUTE_TIME_STEP]: executeTimeStepTestScenarios,
            [RESET_STATE]: resetStateTestScenarios,
            [UPGRADE_BUILDING]: upgradeBuildingTestScenarios,
        },
    });
});
