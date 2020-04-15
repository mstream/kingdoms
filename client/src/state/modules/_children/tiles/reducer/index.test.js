// @flow

import {
    tilesReducer,
} from './index';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import {
    DUMMY,
} from '../../../actions/types';
import type {
    ClientStateTilesReducerTestScenario,
} from './_test/types';
import {
    emptyClientState,
} from '../../../../state';
import {
    clientActions,
} from '../../../actions';
import {
    runReducerTestScenarios,
} from '../../../../test-utils';

const stateInitializationScenario: ClientStateTilesReducerTestScenario< ClientDummyAction > = {
    action                   : clientActions.global.dummy(),
    expectedLocalStateCreator: () => {

        return {
            city: {
            },
            terrain: [],
        };

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyClientState,

        // $FlowFixMe
        tiles: undefined,
    },
};

describe(
    `tilesReducer`,
    () => {

        runReducerTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : tilesReducer,
                reducerKey: `tiles`,
                scenarios : {
                    [ DUMMY ]: [
                        stateInitializationScenario,
                    ],

                    /*
                     * TODO add expected state assertion
                     * [UPDATE_STATE]: updateStateTestScenarios,
                     */
                },
            },
        );

    },
);
