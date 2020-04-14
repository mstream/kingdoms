// @flow

import {
    runTestScenarios, success,
} from '../../utils';
import type {
    CommonDummyAction,
} from '../../../actions/types';
import {
    RESET_STATE,
} from '../../../actions/types';
import {
    EXECUTE_TIME_STEP,
} from '../actions';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    executeTimeStepTestScenarios,
} from './_test/execute-time-step-test-scenarios';
import type {
    CommonStateTimeReducerTestScenarios,
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
    timeReducer,
} from './index';
import {
    DUMMY,
} from '../../../../../../client/src/state/modules/actions/types';

const stateInitializationScenario: CommonStateTimeReducerTestScenarios< CommonDummyAction > = {
    action                        : dummy(),
    expectedReductionResultCreator: () => {

        return success(
            {
                state: initialCommonState.time,
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
    `timeReducer`,
    () => {

        runTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : timeReducer,
                reducerKey: `time`,
                scenarios : {
                    [ DUMMY ]: [
                        stateInitializationScenario,
                    ],
                    [ EXECUTE_TIME_STEP ]: executeTimeStepTestScenarios,
                    [ RESET_STATE ]      : resetStateTestScenarios,
                },
            },
        );

    },
);
