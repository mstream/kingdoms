// @flow

import {
    DUMMY,
} from '../../../actions/types';
import {
    LOAD_PLAYER,
} from '../actions/types';
import {
    clientActions,
} from '../../../actions';
import {
    emptyClientState,
} from '../../../../state';
import {
    generateTests,
} from '../../../../test-utils';
import {
    loadPlayerTestScenarios,
} from './_test/load-player-test-scenarios';
import {
    playerReducer,
} from './index';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import type {
    ClientStatePlayerReducerTestScenario,
} from './_test/types';

type StateInitializationScenario =
    ClientStatePlayerReducerTestScenario< ClientDummyAction >;

const stateInitializationScenario: StateInitializationScenario = {
    action                   : clientActions.global.dummy(),
    expectedLocalStateCreator: () => {

        return {
            name: null,
        };

    },
    name               : `initializes its state`,
    previousGlobalState: {
        ...emptyClientState,

        // $FlowFixMe
        player: undefined,
    },
};

describe(
    `playerReducer`,
    () => {

        generateTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                reducer   : playerReducer,
                reducerKey: `player`,
                scenarios : {
                    [ DUMMY ]: [
                        stateInitializationScenario,
                    ],
                    [ LOAD_PLAYER ]: loadPlayerTestScenarios,
                },
            },
        );

    },
);
