// @flow

import { updateStateTestScenarios } from './update-state-test-scenarios';
import type { ClientAction, ClientDummyAction } from '../../../actions';
import { dummy } from '../../../actions';
import type { ClientStateCommonStateReducerTestScenario } from './types';
import { emptyClientState } from '../../types';
import { commonStateReducer } from './index';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateCommonStateReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.commonState;
                const actual = commonStateReducer(previousLocalState, scenario.action, scenario.previousGlobalState);
                const expectedLocalState = scenario.expectedLocalStateCreator({ previousLocalState });
                expect(actual).toEqual(expectedLocalState);
            });
        },
    );
};

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
    // $FlowFixMe
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...updateStateTestScenarios,
        ],
    });
});
