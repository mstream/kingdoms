// @flow

import {
    citiesReducer,
} from './index';
import {
    initialCommonState,
} from '../../../index';
import {
    success,
} from '../../utils';
import {
    emptyCommonState,
} from '../../state';
import type {
    CommonDummyAction,
} from '../../../actions/types';
import {
    RESET_STATE,
} from '../../../actions/types';
import {
    dummy,
} from '../../../actions';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../actions/types';
import {
    abandonCityTestScenarios,
} from './_test/abandon-city-test-scenarios';
import {
    changeCityNameTestScenarios,
} from './_test/change-city-name-test-scenarios';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../orders/actions/types';
import {
    createOrderTestScenarios,
} from './_test/create-order-test-scenarios';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import {
    executeTimeStepTestScenarios,
} from './_test/execute-time-step-test-scenarios';
import {
    upgradeBuildingTestScenarios,
} from './_test/upgrade-building-test-scenarios';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './_test/types';
import {
    DUMMY,
} from '../../../../../../client/src/state/modules/actions/types';
import {
    createCityTestScenarios,
} from './_test/create-city-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../test-utils';

const stateInitializationScenario: CommonStateCitiesReducerTestScenarios< CommonDummyAction > = {
    action                        : dummy(),
    expectedReductionResultCreator: () => {

        return success(
            {
                state: initialCommonState.cities,
            },
        );

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyCommonState,

        // $FlowFixMe
        cities: undefined,
    },
};

describe(
    `citiesReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : citiesReducer,
                reducerKey: `cities`,
                scenarios : {
                    [ ABANDON_CITY ]                 : abandonCityTestScenarios,
                    [ CHANGE_CITY_NAME ]             : changeCityNameTestScenarios,
                    [ CREATE_CITY ]                  : createCityTestScenarios,
                    [ CREATE_SCHEDULED_ATTACK_ORDER ]: createOrderTestScenarios,
                    [ DUMMY ]                        : [
                        stateInitializationScenario,
                    ],
                    [ EXECUTE_TIME_STEP ]: executeTimeStepTestScenarios,
                    [ RESET_STATE ]      : resetStateTestScenarios,
                    [ UPGRADE_BUILDING ] : upgradeBuildingTestScenarios,
                },
            },
        );

    },
);
