// @flow


import type { ClientStatePlayerReducerTestScenario } from './index';
import { playerReducer } from './index';
import { dummy } from '../../../../../common/src/actions';
import { emptyClientState, initialClientState } from '../../state';
import type { ClientAction, ClientDummyAction } from '../../actions';
import { loadPlayerTestScenarios } from './load-player-test-scenarios';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStatePlayerReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.player;
                const actual = playerReducer(scenario.previousGlobalState.player, scenario.action, scenario.previousGlobalState);
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
            ...initialClientState.player,
        };
    },
};

describe('playerReducer', () => {
    // $FlowFixMe
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            ...loadPlayerTestScenarios,
        ],
    });
});
