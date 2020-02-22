/**
 * @flow
 */
import type { Reducer } from 'redux';
import { tileSize } from './root';
import type { ClientAction } from '../actions';
import type {Vector} from '../../../../common/src/vector';
import type {Geometry} from '../../../../common/src/geometry';

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
