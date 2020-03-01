/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {ClientAction} from '../actions';
import type {Vector} from '../../../../common/src/vector';
import type {Geometry} from '../../../../common/src/geometry';
import tumult from 'tumult';
import {surfaceImages} from '../../assets/images/terrain';

export type TileType = 'PLAINS';

export type ClientStateTile = {
    geometry: Geometry,
    index: Vector,
    textureIndex: number,
    type: TileType,
};

export type ClientStateTiles = $ReadOnlyArray<ClientStateTile>;

const perlin2 = new tumult.Simplex2('qwerty');

export const tileSize = {
    x: 64,
    y: 64,
};

const calculateTextureIndex = ({index}: { index: Vector }): number => {
    return Math.round(Math.abs(perlin2.gen(Math.abs(index.x), Math.abs(index.y))) * (surfaceImages.length - 1));
};

const initialState: ClientStateTiles = [];

export const tilesReducer: Reducer<ClientStateTiles, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'UPDATE_STATE': {
            const newTiles = [];

            for (let y = -action.payload.serverState.world.size.y; y <= action.payload.serverState.world.size.y; y++) {
                for (let x = -action.payload.serverState.world.size.x; x <= action.payload.serverState.world.size.x; x++) {
                    const index = {x, y};
                    newTiles.push({
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

            return newTiles;
        }
        default: {
            return state;
        }
    }
};
