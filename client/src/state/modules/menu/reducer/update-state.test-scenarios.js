// @flow


import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../../common/src/state';
import { emptyClientState } from '../../types';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientUpdateStateAction } from '../../common-state/actions';
import { updateState } from '../../common-state/actions';

export const updateStateTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientUpdateStateAction>> = [
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

