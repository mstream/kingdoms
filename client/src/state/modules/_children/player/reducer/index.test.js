// @flow

import {
    playerReducer,
} from './index';
import {
    loadPlayerTestScenarios,
} from './_test/load-player-test-scenarios';
import {
    clientActions,
} from '../../../actions';
import type {
    ClientDummyAction,
} from '../../../actions/types';
import {
    DUMMY,
} from '../../../actions/types';
import type {
    ClientStatePlayerReducerTestScenario,
} from './_test/types';
import {
    emptyClientState,
} from '../../../../state';
import {
    LOAD_PLAYER,
} from '../actions/types';
import {
    runReducerTestScenarios,
} from '../../../../test-utils';

const stateInitializationScenario: ClientStatePlayerReducerTestScenario< ClientDummyAction > = {
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

        runReducerTestScenarios(
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
