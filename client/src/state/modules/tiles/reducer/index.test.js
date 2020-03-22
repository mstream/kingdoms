// @flow

import { dummy } from '../../../actions';
import { emptyClientState } from '../../types';
import { updateStateTestScenarios } from './test/update-state-test-scenarios';
import { tilesReducer } from './index';
import type { ClientAction } from '../../../types';
import type { ClientDummyAction } from '../../../actions/types';
import type { ClientStateTilesReducerTestScenario } from './test/types';

const runScenarios = ({ scenarios }: { scenarios: $ReadOnlyArray<ClientStateTilesReducerTestScenario<ClientAction>> }): void => {
    scenarios.forEach(
        (scenario) => {
            it(scenario.name, () => {
                const previousLocalState = scenario.previousGlobalState.tiles;
                const actual = tilesReducer(previousLocalState, scenario.action, scenario.previousGlobalState);
                const expectedLocalState = scenario.expectedLocalStateCreator({ previousLocalState });
                expect(actual).toEqual(expectedLocalState);
            });
        },
    );
};

const stateInitializationScenario: ClientStateTilesReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: dummy(),
    previousGlobalState: {
        ...emptyClientState,
        // $FlowFixMe
        tiles: undefined,
    },
    expectedLocalStateCreator: ({ previousLocalState }) => {
        return {
            city: {},
            terrain: [],
        };
    },
};

describe('tilesReducer', () => {
    runScenarios({
        scenarios: [
            stateInitializationScenario,
            // TODO add expected state assertion
            // ...updateStateTestScenarios,
        ],
    });
});
