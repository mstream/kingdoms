// @flow

import {
    DUMMY,
} from '../../../actions/types';
import {
    FAIL_WORLDS_UPDATE,
    REQUEST_WORLDS_UPDATE,
    SUCCEED_WORLDS_UPDATE,
} from '../actions/types';
import {
    clientActions,
} from '../../../actions';
import {
    emptyClientState,
} from '../../../../state';
import {
    failWorldsUpdateTestScenarios,
} from './_test/fail-worlds-update-test-scenarios';
import {
    generateReducerTests,
} from '../../../../test-utils';
import {
    requestWorldsUpdateTestScenarios,
} from './_test/request-worlds-update-test-scenarios';
import {
    succeedWorldsUpdateTestScenarios,
} from './_test/succeed-worlds-update-test-scenarios';
import {
    worldsReducer,
} from './index';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import type {
    ClientStateErrorsReducerTestScenario,
} from './_test/types';

type StateInitializationScenario =
    ClientStateErrorsReducerTestScenario< ClientDummyAction >

const stateInitializationScenario: StateInitializationScenario = {
    action                   : clientActions.global.dummy(),
    expectedLocalStateCreator: () => {

        return {
            isLoading: false,
            items    : [],
        };

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyClientState,

        // $FlowFixMe
        worlds: undefined,
    },
};

const scenarios = {
    [ DUMMY ]: [
        stateInitializationScenario,
    ],
    [ FAIL_WORLDS_UPDATE ]   : failWorldsUpdateTestScenarios,
    [ REQUEST_WORLDS_UPDATE ]: requestWorldsUpdateTestScenarios,
    [ SUCCEED_WORLDS_UPDATE ]: succeedWorldsUpdateTestScenarios,
};

describe(
    `worldsReducer`,
    () => {

        generateReducerTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : worldsReducer,
                reducerKey: `worlds`,
                scenarios,
            },
        );

    },
);
