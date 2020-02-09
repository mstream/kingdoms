/**
 * @flow
 */

import type {Dispatch} from 'redux';
import {createStore} from 'redux';
import type {Action, State} from './types';

const tileSize = {
    x: 64,
    y: 64
};

const worldSizeInTiles = {
    x: 30,
    y: 30
};

const worldSize = {
    x: worldSizeInTiles.x * tileSize.x,
    y: worldSizeInTiles.x * tileSize.y
};

const tiles = [];

const halfWidth = Math.floor(worldSizeInTiles.x / 2);
const halfHeight = Math.floor(worldSizeInTiles.y / 2);

for (let y = -halfHeight; y <= halfHeight; y++) {
    for (let x = -halfWidth; x <= halfWidth; x++) {
        tiles.push({
            index: {x, y},
            location: {x: x * tileSize.x, y: y * tileSize.y},
            type: 'PLAINS'
        });
    }
}

const initialState = Object.freeze({
    ui: {
        worldMap: {
            camera: {
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
                tileSize,
                worldSize,
                tiles
            }
        }
    }
});

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'CAMERA_MOVED': {
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
                                location: {
                                    ...state.ui.worldMap.camera.geometry.location,
                                    x: state.ui.worldMap.camera.geometry.location.x + action.payload.x * state.ui.worldMap.camera.movementSpeed.x,
                                    y: state.ui.worldMap.camera.geometry.location.y + action.payload.y * state.ui.worldMap.camera.movementSpeed.y,
                                }
                            }
                        }
                    }
                }
            };
        }
        case 'CAMERA_ZOOMED': {
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
                                size: {
                                    ...state.ui.worldMap.camera.geometry.size,
                                    x: state.ui.worldMap.camera.geometry.size.x + action.payload.x * state.ui.worldMap.camera.zoomingSpeed.x,
                                    y: state.ui.worldMap.camera.geometry.size.y + action.payload.y * state.ui.worldMap.camera.zoomingSpeed.y,
                                }
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

export const store = createStore<State, Action, Dispatch<Action>>(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
