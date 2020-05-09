// @flow

import {
    DUMMY,
} from '../../../../../../../client/src/pages/world/state/modules/actions/types';
import {
    RESET_STATE,
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
    rulesReducer,
} from './index';
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
    CommonStateRulesReducerTestScenario,
} from './_test/types';

type StateInitializationScenario =
    CommonStateRulesReducerTestScenario< CommonDummyAction >;

const stateInitializationScenario: StateInitializationScenario = {
    action                        : dummy(),
    expectedReductionResultCreator: () => {

        return success(
            {
                state: initialCommonState.rules,
            },
        );

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyCommonState,

        // $FlowFixMe
        rules: undefined,
    },
};

describe(
    `rulesReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : rulesReducer,
                reducerKey: `rules`,
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
