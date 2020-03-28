// @flow


import { playerReducer } from './index';
import { loadPlayerTestScenarios } from './_test/load-player-test-scenarios';
import { clientActions } from '../../../actions';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStatePlayerReducerTestScenario } from './_test/types';
import { emptyClientState } from '../../../../state';
import { runReducerTestScenarios } from '../../../../utils';
import { LOAD_PLAYER } from '../actions/types';


const stateInitializationScenario: ClientStatePlayerReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: clientActions.dummy.dummy(),
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
    runReducerTestScenarios({
        reducer: playerReducer,
        reducerKey: 'player',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            [LOAD_PLAYER]: loadPlayerTestScenarios,
        },
    });
});

