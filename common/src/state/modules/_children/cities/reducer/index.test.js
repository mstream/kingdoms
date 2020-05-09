// @flow

import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../orders/actions/types';
import {
    DUMMY,
} from '../../../../../../../client/src/pages/world/state/modules/actions/types';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import {
    RESET_STATE,
} from '../../../../actions/types';
import {
    abandonCityScenarios,
} from './_test/abandon-city-scenarios';
import {
    changeCityNameScenarios,
} from './_test/change-city-name-scenarios';
import {
    citiesReducer,
} from './index';
import {
    createCityScenarios,
} from './_test/create-city-scenarios';
import {
    createScheduledAttackOrderScenarios,
} from './_test/create-scheduled-attack-order-scenarios';
import {
    dummy,
} from '../../../../actions';
import {
    emptyCommonState,
} from '../../../state';
import {
    executeTimestepScenarios,
} from './_test/execute-timestep-scenarios';
import {
    initialCommonState,
} from '../../../../index';
import {
    resetStateScenarios,
} from './_test/reset-state-scenarios';
import {
    runReducerTestScenarios,
} from '../../../test-utils';
import {
    success,
} from '../../../utils';
import {
    upgradeBuildingsScenarios,
} from './_test/upgrade-building-scenarios';
import type {
    CommonDummyAction,
} from '../../../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './_test/types';

type StateInitializationScenario =
    CommonStateCitiesReducerTestScenarios< CommonDummyAction >;

const stateInitializationScenario: StateInitializationScenario = {
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

const scenarios = {
    [ ABANDON_CITY ]                 : abandonCityScenarios,
    [ CHANGE_CITY_NAME ]             : changeCityNameScenarios,
    [ CREATE_CITY ]                  : createCityScenarios,
    [ CREATE_SCHEDULED_ATTACK_ORDER ]: createScheduledAttackOrderScenarios,
    [ DUMMY ]                        : [
        stateInitializationScenario,
    ],
    [ EXECUTE_TIME_STEP ]: executeTimestepScenarios,
    [ RESET_STATE ]      : resetStateScenarios,
    [ UPGRADE_BUILDING ] : upgradeBuildingsScenarios,
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
                scenarios,
            },
        );

    },
);
