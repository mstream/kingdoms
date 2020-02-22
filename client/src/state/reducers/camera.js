/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {Vector} from '../../../../common/src/vector';
import {
    addVectors,
    divideVectors,
    multipleVectors,
    negateVector,
} from '../../../../common/src/vector';
import type {Boundary} from '../../../../common/src/boundary';
import {clipToBoundary} from '../../../../common/src/boundary';
import {tileSize} from './root';
import type {ClientAction} from '../actions';
import type {Geometry} from '../../../../common/src/geometry';

export type ClientStateCamera = ?{
    locationLimit: Boundary,
    geometry: Geometry,
    movementSpeed: Vector,
    sizeLimit: Boundary,
    zoomingSpeed: Vector,
};

const initialState: ClientStateCamera = null;

export const cameraReducer: Reducer<ClientStateCamera, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'MOVE_CAMERA': {
            if (state == null) {
                return state;
            }
            const newCameraLocation = clipToBoundary({
                vector: addVectors({
                    vector1: state.geometry.location,
                    vector2: multipleVectors({
                        vector1: state.geometry.size,
                        vector2: multipleVectors({
                            vector1: state.movementSpeed,
                            vector2: action.payload.vector,
                        }),
                    }),
                }),
                boundary: state.locationLimit,
            });

            return {
                ...state,
                geometry: {
                    ...state.geometry,
                    location: newCameraLocation,
                },
            };
        }
        case 'ZOOM_CAMERA': {
            if (state == null) {
                return state;
            }
            const newCameraSize = clipToBoundary({
                vector: addVectors({
                    vector1: state.geometry.size,
                    vector2: multipleVectors({
                        vector1: state.zoomingSpeed,
                        vector2: action.payload.vector,
                    }),
                }),
                boundary: state.sizeLimit,
            });

            return {
                ...state,
                geometry: {
                    ...state.geometry,
                    size: newCameraSize,
                },
            };
        }
        case 'UPDATE_STATE': {
            if (state != null) {
                return state;
            }
            const halfWorldSizeInTiles = divideVectors({
                vector1: action.payload.serverState.worldSize,
                vector2: {x: 2, y: 2},
            });
            const halfWorldSize = multipleVectors({
                vector1: halfWorldSizeInTiles,
                vector2: tileSize,
            });
            return {
                geometry: {
                    location: {
                        x: 0,
                        y: 0,
                    },
                    size: {
                        x: 1280,
                        y: 800,
                    },
                },
                locationLimit: {
                    min: negateVector({vector: halfWorldSize}),
                    max: halfWorldSize,
                },
                movementSpeed: {
                    x: 0.1,
                    y: 0.1,
                },
                sizeLimit: {
                    min: {x: 640, y: 400},
                    max: {x: 3200, y: 2000},
                },
                zoomingSpeed: {
                    x: 100,
                    y: 100,
                },
            };
        }
        default: {
            return state;
        }
    }
};
