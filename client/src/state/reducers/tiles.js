/**
 * @flow
 */
import type { Reducer } from 'redux';
import { tileSize } from './root';
import type { Geometry, Vector } from '../../../../common/src/types';
import type { ClientAction } from '../actions';

export type TileType = 'PLAINS';

export type ClientStateTile = {
    geometry: Geometry,
    index: Vector,
    type: TileType,
};

export type ClientStateTiles = $ReadOnlyArray<ClientStateTile>;

const initialState: ClientStateTiles = [];

export const tilesReducer: Reducer<ClientStateTiles, ClientAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'SERVER_STATE_UPDATED': {
            const newTiles = [];

            const halfWidth = Math.floor(action.payload.worldSizeInTiles.x / 2);
            const halfHeight = Math.floor(
                action.payload.worldSizeInTiles.y / 2
            );

            for (let y = -halfHeight; y <= halfHeight; y++) {
                for (let x = -halfWidth; x <= halfWidth; x++) {
                    newTiles.push({
                        index: { x, y },
                        geometry: {
                            location: { x: x * tileSize.x, y: y * tileSize.y },
                            size: tileSize,
                        },
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
