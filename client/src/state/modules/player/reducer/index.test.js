// @flow


import { playerReducer } from './index';
import type { ClientAction, ClientDummyAction } from '../../../actions';
import { loadPlayerTestScenarios } from './load-player-test-scenarios';
import { emptyClientState } from '../../types';
import type { ClientStatePlayerReducerTestScenario } from './types';
import { dummy } from '../../../actions';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStatePlayerReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.player;
                const actual = playerReducer(previousLocalState, scenario.action, scenario.previousGlobalState);
                const expectedLocalState = scenario.expectedLocalStateCreator({ previousLocalState });
                expect(actual).toEqual(expectedLocalState);
            });
        },
    );
};

const stateInitializationScenario: ClientStatePlayerReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyClientState,
        // $FlowFixMe
        player: undefined,
    },
    expectedLocalStateCreator: ({ previousLocalState }) => {
        return {
            name: null,
        };
    },
};

describe('playerReducer', () => {
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...loadPlayerTestScenarios,
        ],
    });
});
