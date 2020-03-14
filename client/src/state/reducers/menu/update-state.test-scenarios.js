// @flow

import type { ClientUpdateStateAction } from '../../actions';
import { updateState } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import { updateStateMenuReducer } from './update-state';
import {
    emptyCityState,
    emptyCommonState,
    UNIT_CATAPULT,
    UNIT_SWORDMAN,
} from '../../../../../common/src/state';
import type { ClientStateReducerTestScenario } from '../root';

export const updateStateTestScenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientUpdateStateAction>> = [
    {
        name: 'upates state',
        action: updateState({
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
        }),
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
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                newCity: {
                    ...previousLocalState.newCity,
                    isCityBeingCreated: false,
                },
            };
        },
    },
];

