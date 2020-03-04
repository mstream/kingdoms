// @flow
import type {ClientAction} from '../actions';
import type {Vector} from '../../../../common/src/vector';
import {multipleVectors} from '../../../../common/src/vector';
import tumult from 'tumult';
import {surfaceImages} from '../../assets/images/terrain';
import type {ClientState, ClientStateTiles} from '../state';
import {initialClientState} from '../state';
import {UPDATE_STATE} from '../actions';

const perlin2 = new tumult.Simplex2('qwerty');

export const tileSize = {
    x: 64,
    y: 64,
};

const calculateTextureIndex = ({index}: { index: Vector }): number => {
    return Math.round(Math.abs(perlin2.gen(Math.abs(index.x), Math.abs(index.y))) * (surfaceImages.length - 1));
};


export const tilesReducer = (
    localState: ClientStateTiles = initialClientState.tiles,
    action: ClientAction,
    globalState: ClientState,
): ClientStateTiles => {
    switch (action.type) {
        case UPDATE_STATE: {
            const newCityTiles = Object.keys(action.payload.serverState.cities).reduce(
                (newCityTiles, cityId) => {
                    const city = action.payload.serverState.cities[cityId];

                    const geometry = {
                        location: multipleVectors({
                            vector1: city.location,
                            vector2: tileSize,
                        }),
                        size: tileSize,
                    };

                    return {
                        ...newCityTiles,
                        [cityId]: {
                            geometry,
                            index: city.location,
                            textureIndex: 0,
                            type: 'CITY',
                        },
                    };
                },
                Object.freeze({}),
            );

            const newTerrainTiles = [];

            for (let y = -action.payload.serverState.world.size.y; y <= action.payload.serverState.world.size.y; y++) {
                for (let x = -action.payload.serverState.world.size.x; x <= action.payload.serverState.world.size.x; x++) {
                    const index = {x, y};
                    newTerrainTiles.push({
                        index,
                        geometry: {
                            location: {x: x * tileSize.x, y: y * tileSize.y},
                            size: tileSize,
                        },
                        textureIndex: calculateTextureIndex({
                            index: {
                                x: index.x + action.payload.serverState.world.size.x,
                                y: index.y + action.payload.serverState.world.size.y
                            }
                        }),
                        type: 'PLAINS',
                    });
                }
            }

            return {
                ...localState,
                city: newCityTiles,
                terrain: newTerrainTiles,
            };
        }
        default: {
            return localState;
        }
    }
};
