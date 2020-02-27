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

            const halfWidth = Math.floor(action.payload.serverState.worldSize.x / 2);
            const halfHeight = Math.floor(
                action.payload.serverState.worldSize.y / 2
            );

            for (let y = -halfHeight; y <= halfHeight; y++) {
                for (let x = -halfWidth; x <= halfWidth; x++) {
                    const index = {x, y};
                    newTiles.push({
                        index,
                        geometry: {
                            location: {x: x * tileSize.x, y: y * tileSize.y},
                            size: tileSize,
                        },
                        textureIndex: calculateTextureIndex({index}),
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
