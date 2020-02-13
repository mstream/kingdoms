/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {Action, WorldMap} from '../../types';
import {addVectors, translateSize} from '../../util';

const initialState = null;

const tileSize = {
    x: 64,
    y: 64
};

const minCameraSize = {
    x: tileSize.x * 5,
    y: tileSize.y * 5,
};

const maxCameraSize = {
    x: tileSize.x * 20,
    y: tileSize.x * 20,
};

export const worldMapReducer: Reducer<?WorldMap, Action> = (state = initialState, action): ?WorldMap => {
    switch (action.type) {
        case 'CAMERA_MOVED': {
            if (state == null) {
                return state;
            }

            const newCameraLocation = addVectors({
                vector1: state.camera.geometry.location,
                vector2: translateSize({
                    size: state.camera.movementSpeed,
                    vector: action.payload
                })
            });

            const minCameraLocation = {
                x: -state.world.sizeInTiles.x / 2 * tileSize.x,
                y: -state.world.sizeInTiles.y / 2 * tileSize.y,
            };

            const maxCameraLocation = {
                x: state.world.sizeInTiles.x / 2 * tileSize.x,
                y: state.world.sizeInTiles.y / 2 * tileSize.y,
            };

            if (newCameraLocation.x < minCameraLocation.x || newCameraLocation.x > maxCameraLocation.x || newCameraLocation.y < minCameraLocation.y || newCameraLocation.y > maxCameraLocation.y) {
                return state;
            }

            return {
                ...state,
                camera: {
                    ...state.camera,
                    geometry: {
                        ...state.camera.geometry,
                        location: newCameraLocation
                    }
                }
            };
        }
        case 'CAMERA_ZOOMED': {
            if (state == null) {
                return state;
            }


            const newCameraSize = addVectors({
                vector1: state.camera.geometry.size,
                vector2: translateSize({
                    size: state.camera.zoomingSpeed,
                    vector: action.payload
                })
            });

            if (newCameraSize.x < minCameraSize.x || newCameraSize.x > maxCameraSize.x || newCameraSize.y < minCameraSize.y || newCameraSize.y > maxCameraSize.y) {
                return state;
            }

            return {
                ...state,
                camera: {
                    ...state.camera,
                    geometry: {
                        ...state.camera.geometry,
                        size: newCameraSize
                    }
                }
            };
        }
        case 'SERVER_STATE_UPDATED': {
            const tiles = [];

            const halfWidth = Math.floor(action.payload.worldSizeInTiles.x / 2);
            const halfHeight = Math.floor(action.payload.worldSizeInTiles.y / 2);

            for (let y = -halfHeight; y <= halfHeight; y++) {
                for (let x = -halfWidth; x <= halfWidth; x++) {
                    tiles.push({
                        index: {x, y},
                        geometry: {
                            location: {x: x * tileSize.x, y: y * tileSize.y},
                            size: tileSize
                        },
                        type: 'PLAINS'
                    });
                }
            }

            const cities = action.payload.cities.map(city => {
                return {
                    id: city.id,
                    name: city.name,
                    geometry: {
                        location: translateSize({
                            size: city.location,
                            vector: tileSize
                        }),
                        size: tileSize
                    }
                };
            });

            return Object.freeze({
                camera: {
                    debugColor: 'rgba(255,0,0,0.5)',
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
                    movementSpeed: {
                        x: 16,
                        y: 16,
                    },
                    zoomingSpeed: {
                        x: 100,
                        y: 100
                    }
                },
                world: {
                    sizeInTiles: action.payload.worldSizeInTiles,
                    debugColor: 'rgba(0,0,255,0.5)',
                    cities,
                    tiles,
                }
            });
        }
        default: {
            return state;
        }
    }
};
