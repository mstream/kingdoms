// @flow

import {
    DUMMY,
} from '../../../actions/types';
import {
    clientActions,
} from '../../../actions';
import {
    emptyClientState,
} from '../../../../state';
import {
    generateReducerTests,
} from '../../../../test-utils';
import {
    tilesReducer,
} from './index';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import type {
    ClientStateTilesReducerTestScenario,
} from './_test/types';

type StateInitializationScenario =
    ClientStateTilesReducerTestScenario< ClientDummyAction >;

const stateInitializationScenario: StateInitializationScenario = {
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

        generateReducerTests(
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
