/**
 * @flow
 */

import type {Action, State} from '../types';
import {addVectors, translateSize} from '../util';

const tileSize = {
    x: 64,
    y: 64
};

const worldSizeInTiles = {
    x: 30,
    y: 30
};

const minCameraSize = {
    x: 320,
    y: 200,
};

const maxCameraSize = {
    x: 3200,
    y: 2000,
};

const tiles = [];

const halfWidth = Math.floor(worldSizeInTiles.x / 2);
const halfHeight = Math.floor(worldSizeInTiles.y / 2);

const minCameraLocation = {
    x: -halfWidth * tileSize.x,
    y: -halfWidth * tileSize.y
};

const maxCameraLocation = {
    x: halfWidth * tileSize.x,
    y: halfWidth * tileSize.y
};

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

const initialState = Object.freeze({
    ui: {
        worldMap: {
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
                debugColor: 'rgba(0,0,255,0.5)',
                cities: [
                    {
                        id: '1',
                        name: 'city1',
                        geometry: {
                            location: {x: 0 * tileSize.x, y: 0 * tileSize.y},
                            size: tileSize
                        },
                    },
                    {
                        id: '2',
                        name: 'city2',
                        geometry: {
                            location: {x: -3 * tileSize.x, y: -3 * tileSize.y},
                            size: tileSize
                        },
                    },
                    {
                        id: '3',
                        name: 'city3',
                        geometry: {
                            location: {x: 3 * tileSize.x, y: 3 * tileSize.y},
                            size: tileSize
                        },
                    },
                ],
                tiles
            }
        }
    }
});

export const root = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'CAMERA_MOVED': {
            const newCameraLocation = addVectors({
                vector1: state.ui.worldMap.camera.geometry.location,
                vector2: translateSize({
                    size: state.ui.worldMap.camera.movementSpeed,
                    vector: action.payload
                })
            });

            if (newCameraLocation.x < minCameraLocation.x || newCameraLocation.x > maxCameraLocation.x || newCameraLocation.y < minCameraLocation.y || newCameraLocation.y > maxCameraLocation.y) {
                return state;
            }

            return {
                ...state,
                ui: {
                    ...state.ui,
                    worldMap: {
                        ...state.ui.worldMap,
                        camera: {
                            ...state.ui.worldMap.camera,
                            geometry: {
                                ...state.ui.worldMap.camera.geometry,
                                location: newCameraLocation
                            }
                        }
                    }
                }
            };
        }
        case 'CAMERA_ZOOMED': {
            const newCameraSize = addVectors({
                vector1: state.ui.worldMap.camera.geometry.size,
                vector2: translateSize({
                    size: state.ui.worldMap.camera.zoomingSpeed,
                    vector: action.payload
                })
            });

            if (newCameraSize.x < minCameraSize.x || newCameraSize.x > maxCameraSize.x || newCameraSize.y < minCameraSize.y || newCameraSize.y > maxCameraSize.y) {
                return state;
            }

            return {
                ...state,
                ui: {
                    ...state.ui,
                    worldMap: {
                        ...state.ui.worldMap,
                        camera: {
                            ...state.ui.worldMap.camera,
                            geometry: {
                                ...state.ui.worldMap.camera.geometry,
                                size: newCameraSize
                            }
                        }
                    }
                }
            };
        }
        default: {
            return state;
        }
    }
};
