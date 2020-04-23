// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyCityState,
} from '../../../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientUpdateStateAction,
} from '../../../common-state/actions/types';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientUpdateStateAction >, >

export const updateStateTestScenarios: Scenarios = [
    {
        action: clientActions.commonState.updateState(
            {
                commonState: {
                    ...emptyCommonState,
                    cities: {
                        city1: {
                            ...emptyCityState,
                            ownerId: `player2`,
                        },
                        city2: {
                            ...emptyCityState,
                            ownerId: `player1`,
                        },
                    },
                },
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                newCity: {
                    ...previousLocalState.newCity,
                    isCityBeingCreated: false,
                },
            };

        },
        name               : `upates state`,
        previousGlobalState: {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    ...emptyClientState.camera.geometry,
                    location: {
                        ...emptyClientState.camera.geometry.location,
                        x: 0,
                        y: 0,
                    },
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        ownerId: `player2`,
                    },
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
