// @flow

import {
    DUMMY,
} from '../../../actions/types';
import {
    UPDATE_STATE,
} from '../actions/types';
import {
    clientActions,
} from '../../../actions';
import {
    commonStateReducer,
} from './index';
import {
    emptyClientState,
} from '../../../../state';
import {
    runReducerTestScenarios,
} from '../../../../test-utils';
import {
    updateStateTestScenarios,
} from './_test/update-state-test-scenarios';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import type {
    ClientStateCommonStateReducerTestScenario,
} from './_test/types';

type Scenario = ClientStateCommonStateReducerTestScenario< ClientDummyAction >;

const stateInitializationScenario: Scenario = {
    action                   : clientActions.global.dummy(),
    expectedLocalStateCreator: () => {

        return null;

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyClientState,
        commonState: undefined,
    },
};

describe(
    `commonStateReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : commonStateReducer,
                reducerKey: `commonState`,
                scenarios : {
                    [ DUMMY ]: [
                        stateInitializationScenario,
                    ],
                    [ UPDATE_STATE ]: updateStateTestScenarios,
                },
            },
        );

    },
);
