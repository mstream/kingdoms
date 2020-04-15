// @flow

import {
    success,
} from '../../utils';
import type {
    CommonDummyAction,
} from '../../../actions/types';
import {
    RESET_STATE,
} from '../../../actions/types';
import type {
    CommonStateRulesReducerTestScenarios,
} from './_test/types';
import {
    emptyCommonState,
} from '../../state';
import {
    resetStateTestScenarios,
} from './_test/reset-state-test-scenarios';
import {
    dummy,
} from '../../../actions';
import {
    initialCommonState,
} from '../../../index';
import {
    rulesReducer,
} from './index';
import {
    DUMMY,
} from '../../../../../../client/src/state/modules/actions/types';
import {
    runReducerTestScenarios,
} from '../../test-utils';

const stateInitializationScenario: CommonStateRulesReducerTestScenarios< CommonDummyAction > = {
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
