// @flow


import { dummy } from '../../../actions';
import { reportErrorsTestScenarios } from './test/report-errors-test-scenarios';
import { emptyClientState } from '../../types';
import { errorsReducer } from './index';
import type { ClientAction } from '../../../types';
import type { ClientDummyAction } from '../../../actions/types';
import type { ClientStateErrorsReducerTestScenario } from './test/types';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateErrorsReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.errors;
                const actual = errorsReducer(previousLocalState, scenario.action, scenario.previousGlobalState);
                const expectedLocalState = scenario.expectedLocalStateCreator({ previousLocalState });
                expect(actual).toEqual(expectedLocalState);
            });
        },
    );
};

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
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...reportErrorsTestScenarios,
        ],
    });
});
