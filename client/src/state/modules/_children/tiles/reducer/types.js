// @flow

import type {
    Geometry,
} from '../../../../../../../common/src/geometry';
import type {
    Vector,
} from '../../../../../../../common/src/vector';

export type TileType = 'CITY' | 'PLAINS';

export type ClientStateTile = $ReadOnly< {
    geometry: Geometry,
    index: Vector,
    textureIndex: number,
    type: TileType,
} >;

export type ClientStateCityTiles = $ReadOnly< {
    [string]: ClientStateTile,
    ...
} >;

export type ClientStateTerrainTiles = $ReadOnlyArray< ClientStateTile >;

export type ClientStateTiles = $ReadOnly< {
    city: ClientStateCityTiles,
    terrain: ClientStateTerrainTiles,
} >;
