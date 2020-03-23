// @flow


import { playerReducer } from './index';
import { loadPlayerTestScenarios } from './test/load-player-test-scenarios';
import { dummy } from '../../../actions';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStatePlayerReducerTestScenario } from './test/types';
import { emptyClientState } from '../../state';
import { runTestScenarios } from '../../utils';
import { LOAD_PLAYER } from '../actions/types';


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
    runTestScenarios({
        reducer: playerReducer,
        reducerKey: 'player',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [LOAD_PLAYER]: loadPlayerTestScenarios,
        },
    });
});

