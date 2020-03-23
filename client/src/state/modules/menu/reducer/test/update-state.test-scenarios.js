// @flow


import { updateState } from '../../../common-state/actions';
import { emptyCommonState } from '../../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientUpdateStateAction } from '../../../common-state/actions/types';
import { emptyClientState } from '../../../state';

export const updateStateTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientUpdateStateAction>> = [
    {
        name: 'upates state',
        action: updateState({
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    'city2': {
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
                    'city1': {
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

