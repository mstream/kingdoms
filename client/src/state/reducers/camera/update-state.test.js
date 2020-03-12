// @flow

import { updateState } from '../../actions';
import type { ClientState, ClientStateCamera } from '../../state';
import { emptyClientState } from '../../state';
import { updateStateCameraReducer } from './update-state';
import { tileVectorToPixelVector } from '../../../util';
import { addVectors, negateVector } from '../../../../../common/src/vector';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../common/src/state';

describe('updateStateCameraReducer', () => {
    it('handles update state event', () => {
        const commonState = {
            ...emptyCommonState,
            world: {
                ...emptyCommonState.world,
                size: {
                    x: 10,
                    y: 10,
                },
            },
        };

        const action = updateState({ commonState });

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const limit = tileVectorToPixelVector({
            tileVector: addVectors({
                vector1: { x: 10, y: 10 },
                vector2: { x: 0.5, y: 0.5 },
            }),
        });

        const expected: ClientStateCamera = {
            ...previousLocalState,
            locationLimit: {
                ...previousLocalState.locationLimit,
                min: negateVector({ vector: limit }),
                max: limit,
            },
        };

        const actual = updateStateCameraReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });

    it('centers camera on the newly created city', () => {
        const commonState = {
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
        };

        const action = updateState({ commonState });

        const previousGlobalState: ClientState = {
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
        };

        const previousLocalState: ClientStateCamera = previousGlobalState.camera;

        const location = tileVectorToPixelVector({
            tileVector: addVectors({
                vector1: { x: 2, y: 4 },
                vector2: { x: 0.5, y: 0.5 },
            }),
        });

        const expected: ClientStateCamera = {
            ...previousLocalState,
            geometry: {
                ...previousLocalState.geometry,
                location,
            },
        };

        const actual = updateStateCameraReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
