// @flow

import type { ClientAction } from '../../../actions';
import type { Geometry } from '../../../../../../common/src/geometry';
import type { Vector } from '../../../../../../common/src/vector';
import { zeroVector } from '../../../../../../common/src/vector';
import type { ClientStateReducerTestScenario } from '../../types';

export type TileType = 'CITY' | 'PLAINS';

export type ClientStateTilesReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateTiles, A>;

export type ClientStateTile = $ReadOnly<{
    geometry: Geometry,
    index: Vector,
    textureIndex: number,
    type: TileType,
}>;

export type ClientStateCityTiles = $ReadOnly<{
    [string]: ClientStateTile,
    ...
}>;

export type ClientStateTerrainTiles = $ReadOnlyArray<ClientStateTile>;

export type ClientStateTiles = $ReadOnly<{
    city: ClientStateCityTiles,
    terrain: ClientStateTerrainTiles,
}>;

export const emptyTilesState: ClientStateTiles = {
    city: Object.freeze({}),
    terrain: [],
};
export const emptyClientStateCityTile: ClientStateTile = {
    geometry: {
        location: zeroVector,
        size: zeroVector,
    },
    index: zeroVector,
    textureIndex: 0,
    type: 'CITY',
};

export const emptyClientStateTerrainTile: ClientStateTile = {
    geometry: {
        location: zeroVector,
        size: zeroVector,
    },
    index: zeroVector,
    textureIndex: 0,
    type: 'PLAINS',
};

