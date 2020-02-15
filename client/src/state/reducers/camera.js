/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {Action} from '../../types';
import type {ClientStateCamera} from '../types';
import {
    addVectors,
    divideVectors,
    multipleVectors,
    negateVector
} from '../../../../common/src/vector';
import {clipToBoundary} from '../../../../common/src/boundary';
import {tileSize} from './root';

const initialState: ClientStateCamera = {
    locationLimit: {
        min: {x: 0, y: 0},
        max: {x: 0, y: 0},
    },
    geometry: {
        location: {x: 0, y: 0},
        size: {x: 0, y: 0}
    },
    movementSpeed: {x: 0, y: 0},
    sizeLimit: {
        min: {x: 0, y: 0},
        max: {x: 0, y: 0}
    },
    zoomingSpeed: {x: 0, y: 0},
};

export const cameraReducer: Reducer<ClientStateCamera, Action> = (state = initialState, action) => {
    switch (action.type) {
        case 'CAMERA_MOVED': {
            const newCameraLocation = clipToBoundary({
                vector: addVectors({
                    vector1: state.geometry.location,
                    vector2: multipleVectors({
                        vector1: state.geometry.size,
                        vector2: multipleVectors({
                            vector1: state.movementSpeed,
                            vector2: action.payload
                        })
                    })
                }),
                boundary: state.locationLimit
            });

            return {
                ...state,
                geometry: {
                    ...state.geometry,
                    location: newCameraLocation,
                }
            };
        }
        case 'CAMERA_ZOOMED': {
            const newCameraSize = clipToBoundary({
                vector: addVectors({
                    vector1: state.geometry.size,
                    vector2: multipleVectors({
                        vector1: state.zoomingSpeed,
                        vector2: action.payload
                    })
                }),
                boundary: state.sizeLimit
            });

            return {
                ...state,
                geometry: {
                    ...state.geometry,
                    size: newCameraSize
                }
            };
        }
        case 'SERVER_STATE_UPDATED': {
            const halfWorldSizeInTiles = divideVectors({
                vector1: action.payload.worldSizeInTiles,
                vector2: {x: 2, y: 2}
            });
            const halfWorldSize = multipleVectors({
                vector1: halfWorldSizeInTiles,
                vector2: tileSize
            });
            return {
                geometry: {
                    location: {
                        x: 0,
                        y: 0
                    },
                    size: {
                        x: 400,
                        y: 300
                    }
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
                    min: {x: 320, y: 200},
                    max: {x: 3200, y: 2000},
                },
                zoomingSpeed: {
                    x: 100,
                    y: 100
                }
            };
        }
        default: {
            return state;
        }
    }
};
