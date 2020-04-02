// @flow

import { zeroVector } from '../../../../../../../common/src/vector';
import type { ClientStateTile, ClientStateTiles } from './types';

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

export const initialTilesState = {
    city: {},
    terrain: [],
};
