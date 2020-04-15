// @flow

import {
    DUMMY,
} from '../../../../../../client/src/state/modules/actions/types';
import {
    EXECUTE_TIME_STEP,
} from '../actions';
import {
    RESET_STATE,
} from '../../../actions/types';
import {
    dummy,
} from '../../../actions';
import {
    emptyCommonState,
} from '../../state';
import {
    executeTimeStepTestScenarios,
} from './_test/execute-time-step-test-scenarios';
import {
    initialCommonState,
} from '../../../index';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../test-utils';
import {
    success,
} from '../../utils';
import {
    timeReducer,
} from './index';
import type {
    CommonDummyAction,
} from '../../../actions/types';
import type {
    CommonStateTimeReducerTestScenarios,
} from './_test/types';

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

        runReducerTestScenarios(
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
