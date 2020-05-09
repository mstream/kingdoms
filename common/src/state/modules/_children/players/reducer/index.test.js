// @flow

import {
    CREATE_CITY,
} from '../../cities/actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../orders/actions/types';
import {
    DUMMY,
} from '../../../../../../../client/src/pages/world/state/modules/actions/types';
import {
    RESET_STATE,
} from '../../../../actions/types';
import {
    createCityTestScenarios,
} from './_test/create-city-test-scenarios';
import {
    createOrderTestScenarios,
} from './_test/create-order-test-scenarios';
import {
    dummy,
} from '../../../../actions';
import {
    emptyCommonState,
} from '../../../state';
import {
    initialCommonState,
} from '../../../../index';
import {
    playersReducer,
} from './index';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../../test-utils';
import {
    success,
} from '../../../utils';
import type {
    CommonDummyAction,
} from '../../../../actions/types';
import type {
    CommonStatePlayersReducerTestScenario,
} from './_test/types';

type StateInitializationScenario =
    CommonStatePlayersReducerTestScenario< CommonDummyAction >;

const stateInitializationScenario: StateInitializationScenario = {
    action                        : dummy(),
    expectedReductionResultCreator: () => {

        return success(
            {
                state: initialCommonState.players,
            },
        );

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyCommonState,

        // $FlowFixMe
        time: undefined,
    },
};

describe(
    `playersReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : playersReducer,
                reducerKey: `players`,
                scenarios : {
                    [ CREATE_CITY ]                  : createCityTestScenarios,
                    [ CREATE_SCHEDULED_ATTACK_ORDER ]: createOrderTestScenarios,
                    [ DUMMY ]                        : [
                        stateInitializationScenario,
                    ],
                    [ RESET_STATE ]: resetStateTestScenarios,
                },
            },
        );

    },
);
