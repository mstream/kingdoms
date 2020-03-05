// @flow
import {
    addVectors,
    multipleVectors,
    negateVector,
} from '../../../../common/src/vector';
import {clipToBoundary} from '../../../../common/src/boundary';
import {tileSize} from './tiles';
import type {ClientAction} from '../actions';
import {MOVE_CAMERA, UPDATE_STATE, ZOOM_CAMERA} from '../actions';
import type {ClientState, ClientStateCamera} from '../state';
import {initialClientState} from '../state';

export const cameraReducer = (
    localState: ClientStateCamera = initialClientState.camera,
    action: ClientAction,
    globalState: ClientState,
): ClientStateCamera => {
    switch (action.type) {
        case MOVE_CAMERA: {
            const newCameraLocation = clipToBoundary({
                vector: addVectors({
                    vector1: localState.geometry.location,
                    vector2: multipleVectors({
                        vector1: localState.geometry.size,
                        vector2: multipleVectors({
                            vector1: localState.movementSpeed,
                            vector2: action.payload.vector,
                        }),
                    }),
                }),
                boundary: localState.locationLimit,
            });

            return {
                ...localState,
                geometry: {
                    ...localState.geometry,
                    location: newCameraLocation,
                },
            };
        }
        case ZOOM_CAMERA: {
            const newCameraSize = clipToBoundary({
                vector: addVectors({
                    vector1: localState.geometry.size,
                    vector2: multipleVectors({
                        vector1: localState.zoomingSpeed,
                        vector2: action.payload.vector,
                    }),
                }),
                boundary: localState.sizeLimit,
            });

            return {
                ...localState,
                geometry: {
                    ...localState.geometry,
                    size: newCameraSize,
                },
            };
        }
        case UPDATE_STATE: {
            const halfWorldSize = multipleVectors({
                vector1: addVectors({
                    vector1: action.payload.serverState.world.size,
                    vector2: {x: 0.5, y: 0.5}
                }),
                vector2: tileSize,
            });

            return {
                ...initialClientState.camera,
                locationLimit: {
                    min: negateVector({vector: halfWorldSize}),
                    max: halfWorldSize,
                },
            };
        }
        default: {
            return localState;
        }
    }
};
