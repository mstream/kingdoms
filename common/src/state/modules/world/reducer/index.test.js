// @flow

import {
    initialCommonState,
} from '../../../index';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    worldReducer,
} from './index';
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
    DUMMY, RESET_STATE,
} from '../../../actions/types';
import type {
    CommonStateWorldReducerTestScenarios,
} from './_test/types';
import {
    dummy,
} from '../../../actions';
import {
    runReducerTestScenarios,
} from '../../test-utils';

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
