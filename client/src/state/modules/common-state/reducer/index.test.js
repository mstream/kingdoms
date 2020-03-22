// @flow

import { updateStateTestScenarios } from './test/update-state-test-scenarios';
import { dummy } from '../../../actions';
import { emptyClientState } from '../../types';
import { commonStateReducer } from './index';
import type { ClientAction } from '../../../types';
import type { ClientDummyAction } from '../../../actions/types';
import type { ClientStateCommonStateReducerTestScenario } from './test/types';

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
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...updateStateTestScenarios,
        ],
    });
});
