// @flow

import { tilesReducer } from './index';
import type { ClientDummyAction } from '../../../actions/types';
import { DUMMY } from '../../../actions/types';
import type { ClientStateTilesReducerTestScenario } from './_test/types';
import { emptyClientState } from '../../../../state';
import { runReducerTestScenarios } from '../../../../utils';
import { clientActions } from '../../../actions';


const stateInitializationScenario: ClientStateTilesReducerTestScenario<ClientDummyAction> = {
    name: 'initializes its state',
    action: clientActions.dummy.dummy(),
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
    runReducerTestScenarios({
        reducer: tilesReducer,
        reducerKey: 'tiles',
        scenarios: {
            [DUMMY]: [stateInitializationScenario],
            // TODO add expected state assertion
            // [UPDATE_STATE]: updateStateTestScenarios,
        },
    });
});
