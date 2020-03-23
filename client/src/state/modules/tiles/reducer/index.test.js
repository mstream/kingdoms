// @flow

import { dummy } from '../../../actions';
import { tilesReducer } from './index';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStateTilesReducerTestScenario } from './test/types';
import { emptyClientState } from '../../state';
import { runTestScenarios } from '../../utils';


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
    runTestScenarios({
        reducer: tilesReducer,
        reducerKey: 'tiles',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            // TODO add expected state assertion
            // [UPDATE_STATE]: updateStateTestScenarios,
        },
    });
});
