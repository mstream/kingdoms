// @flow

import {
    DUMMY,
} from '../../../actions/types';
import {
    REPORT_ERRORS,
} from '../actions/types';
import {
    clientActions,
} from '../../../actions';
import {
    emptyClientState,
} from '../../../../state';
import {
    errorsReducer,
} from './index';
import {
    reportErrorsTestScenarios,
} from './_test/report-errors-test-scenarios';
import {
    runReducerTestScenarios,
} from '../../../../test-utils';
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

        return [];

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyClientState,

        // $FlowFixMe
        player: undefined,
    },
};

describe(
    `errorsReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : errorsReducer,
                reducerKey: `errors`,
                scenarios : {
                    [ DUMMY ]: [
                        stateInitializationScenario,
                    ],
                    [ REPORT_ERRORS ]: reportErrorsTestScenarios,
                },
            },
        );

    },
);
