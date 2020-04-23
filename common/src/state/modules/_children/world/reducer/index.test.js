// @flow

import {
    DUMMY, RESET_STATE,
} from '../../../../actions/types';
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
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../../test-utils';
import {
    success,
} from '../../../utils';
import {
    worldReducer,
} from './index';
import type {
    CommonDummyAction,
} from '../../../../actions/types';
import type {
    CommonStateWorldReducerTestScenarios,
} from './_test/types';

const stateInitializationScenario: CommonStateWorldReducerTestScenarios< CommonDummyAction > = {
    action                        : dummy(),
    expectedReductionResultCreator: () => {

        return success(
            {
                state: initialCommonState.world,
            },
        );

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyCommonState,

        // $FlowFixMe
        world: undefined,
    },
};

describe(
    `worldReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : worldReducer,
                reducerKey: `world`,
                scenarios : {
                    [ DUMMY ]: [
                        stateInitializationScenario,
                    ],
                    [ RESET_STATE ]: resetStateTestScenarios,
                },
            },
        );

    },
);
