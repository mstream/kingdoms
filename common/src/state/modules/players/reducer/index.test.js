// @flow

import type {
    CommonStatePlayersReducerTestScenario,
} from './_test/types';
import {
    dummy,
} from '../../../actions';
import {
    emptyCommonState,
} from '../../state';
import {
    initialCommonState,
} from '../../../index';
import {
    success,
} from '../../utils';
import type {
    CommonDummyAction,
} from '../../../actions/types';
import {
    RESET_STATE,
} from '../../../actions/types';
import {
    playersReducer,
} from './index';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    CREATE_CITY,
} from '../../cities/actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../orders/actions/types';
import {
    createCityTestScenarios,
} from './_test/create-city-test-scenarios';
import {
    createOrderTestScenarios,
} from './_test/create-order-test-scenarios';
import {
    DUMMY,
} from '../../../../../../client/src/state/modules/actions/types';
import {
    runReducerTestScenarios,
} from '../../test-utils';

const stateInitializationScenario: CommonStatePlayersReducerTestScenario< CommonDummyAction > = {
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
