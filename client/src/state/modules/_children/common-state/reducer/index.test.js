// @flow

import { updateStateTestScenarios } from './_test/update-state-test-scenarios';
import { commonStateReducer } from './index';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStateCommonStateReducerTestScenario } from './_test/types';
import { emptyClientState } from '../../../../state';
import { runReducerTestScenarios } from '../../../../utils';
import { UPDATE_STATE } from '../actions/types';
import { clientActions } from '../../../actions';


const stateInitializationScenario: ClientStateCommonStateReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: clientActions.dummy.dummy(),
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
    runReducerTestScenarios({
        reducer: commonStateReducer,
        reducerKey: 'commonState',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [UPDATE_STATE]: updateStateTestScenarios,
        },
    });
});
