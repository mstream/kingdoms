// @flow

import { updateStateTestScenarios } from './test/update-state-test-scenarios';
import { dummy } from '../../../actions';
import { commonStateReducer } from './index';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStateCommonStateReducerTestScenario } from './test/types';
import { emptyClientState } from '../../state';
import { runTestScenarios } from '../../utils';
import { UPDATE_STATE } from '../actions/types';


const stateInitializationScenario: ClientStateCommonStateReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyClientState,
        // $FlowFixMe
        commonState: undefined,
    },
    expectedLocalStateCreator: ({ previousLocalState }) => {
        return null;
    },
};


describe('commonStateReducer', () => {
    runTestScenarios({
        reducer: commonStateReducer,
        reducerKey: 'commonState',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [UPDATE_STATE]: updateStateTestScenarios,
        },
    });
});
