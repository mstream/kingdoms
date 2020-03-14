// @flow

import type { ClientUpdateStateAction } from '../../../actions';
import { updateState } from '../../../actions';
import { addVectors, negateVector } from '../../../../../../common/src/vector';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../../common/src/state';
import { tileVectorToPixelVector } from '../../../../util';
import type { ClientStateCameraReducerTestScenario } from './types';
import { emptyClientState } from '../../types';


export const updateStateTestScenarios: $ReadOnlyArray<ClientStateCameraReducerTestScenario<ClientUpdateStateAction>> = [
    {
        name: 'updates state',
        action: updateState({
            commonState: {
                ...emptyCommonState,
                world: {
                    ...emptyCommonState.world,
                    size: {
                        x: 10,
                        y: 10,
                    },
                },
            },
        }),
        previousGlobalState: {
            ...emptyClientState,
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                locationLimit: {
                    ...previousLocalState.locationLimit,
                    min: negateVector({
                        vector: tileVectorToPixelVector({
                            tileVector: addVectors({
                                vector1: { x: 10, y: 10 },
                                vector2: { x: 0.5, y: 0.5 },
                            }),
                        }),
                    }),
                    max: tileVectorToPixelVector({
                        tileVector: addVectors({
                            vector1: { x: 10, y: 10 },
                            vector2: { x: 0.5, y: 0.5 },
                        }),
                    }),
                },
            };
        },
    },
    {
        name: 'centers camera on the newly created city',
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
                        location: {
                            ...emptyCityState.location,
                            x: 2,
                            y: 4,
                        },
                        ownerId: 'player1',
                    },
                },
                world: {
                    ...emptyCommonState.world,
                    size: {
                        x: 10,
                        y: 10,
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
                world: {
                    ...emptyCommonState.world,
                    size: {
                        x: 10,
                        y: 10,
                    },
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                geometry: {
                    ...previousLocalState.geometry,
                    location: tileVectorToPixelVector({
                        tileVector: addVectors({
                            vector1: { x: 2, y: 4 },
                            vector2: { x: 0.5, y: 0.5 },
                        }),
                    }),
                },
            };
        },
    },
];
