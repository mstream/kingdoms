// @flow

import {
    reportErrorsTestScenarios,
} from './_test/report-errors-test-scenarios';
import {
    errorsReducer,
} from './index';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import {
    DUMMY,
} from '../../../actions/types';
import type {
    ClientStateErrorsReducerTestScenario,
} from './_test/types';
import {
    emptyClientState,
} from '../../../../state';
import {
    REPORT_ERRORS,
} from '../actions/types';
import {
    clientActions,
} from '../../../actions';
import {
    runReducerTestScenarios,
} from '../../../../test-utils';

const stateInitializationScenario: ClientStateErrorsReducerTestScenario< ClientDummyAction > = {
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
