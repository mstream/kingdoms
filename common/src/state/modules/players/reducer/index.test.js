// @flow

import type { CommonStatePlayersReducerTestScenario } from './test/types';
import { dummy } from '../../../actions';
import { emptyCommonState } from '../../state';
import { initialCommonState } from '../../../index';
import { runTestScenarios, success } from '../../utils';
import type { CommonDummyAction } from '../../../actions/types';
import { RESET_STATE } from '../../../actions/types';
import { playersReducer } from './index';
import { resetStateTestScenarios } from './test/reset-state-test-scenarios';
import { CREATE_CITY } from '../../cities/actions/types';
import { CREATE_ORDER } from '../../orders/actions/types';
import { createCityTestScenarios } from './test/create-city-test-scenarios';
import { createOrderTestScenarios } from './test/create-order-test-scenarios';
import { DUMMY } from '../../../../../../client/src/state/modules/actions/types';


const stateInitializationScenario: CommonStatePlayersReducerTestScenario<CommonDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyCommonState,
        // $FlowFixMe
        time: undefined,
    },
    expectedReductionResultCreator: ({ previousLocalState }) => {
        return success({ state: initialCommonState.players });
    },
};

describe('playersReducer', () => {
    runTestScenarios({
        reducer: playersReducer,
        reducerKey: 'players',
        scenarios: {
            [CREATE_CITY]: createCityTestScenarios,
            [CREATE_ORDER]: createOrderTestScenarios,
            [DUMMY]: [stateInitializationScenario],
            [RESET_STATE]: resetStateTestScenarios,
        },
    });
});
