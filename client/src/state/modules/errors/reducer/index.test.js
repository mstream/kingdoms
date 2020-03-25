// @flow


import { dummy } from '../../../actions';
import { reportErrorsTestScenarios } from './test/report-errors-test-scenarios';
import { errorsReducer } from './index';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStateErrorsReducerTestScenario } from './test/types';
import { emptyClientState } from '../../state';
import { runTestScenarios } from '../../utils';
import { REPORT_ERRORS } from '../actions/types';


const stateInitializationScenario: ClientStateErrorsReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyClientState,
        // $FlowFixMe
        player: undefined,
    },
    expectedLocalStateCreator: ({ previousLocalState }) => {
        return [];
    },
};

describe('errorsReducer', () => {
    runTestScenarios({
        reducer: errorsReducer,
        reducerKey: 'errors',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [REPORT_ERRORS]: reportErrorsTestScenarios,
        },
    });
});