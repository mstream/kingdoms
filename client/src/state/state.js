// @flow

import type { Geometry } from '../../../common/src/geometry';
import type { Vector } from '../../../common/src/vector';
import { zeroVector } from '../../../common/src/vector';
import type { Boundary } from '../../../common/src/boundary';
import type { CommonState, CommonStateUnits } from '../../../common/src/state';
import { UNIT_PEASANT } from '../../../common/src/state';

export type ClientStateCamera = $ReadOnly<{
    locationLimit: Boundary,
    geometry: Geometry,
    movementSpeed: Vector,
    sizeLimit: Boundary,
    zoomingSpeed: Vector,
}>;

export const TAB_OVERVIEW: 'TAB_OVERVIEW' = 'TAB_OVERVIEW';
export const TAB_UNITS: 'TAB_UNITS' = 'TAB_UNITS';
export const TAB_RESOURCES: 'TAB_RESOURCES' = 'TAB_RESOURCES';
export const TAB_BUILDINGS: 'TAB_BUILDINGS' = 'TAB_BUILDINGS';

export type ClientStateCityViewTab =
    | typeof TAB_BUILDINGS
    | typeof TAB_OVERVIEW
    | typeof TAB_RESOURCES
    | typeof TAB_UNITS;

export type ClientStateCityView = $ReadOnly<{
    currentCityId: ?string,
    tab: ClientStateCityViewTab,
    unit: $Keys<CommonStateUnits>,
}>;

export type ClientStateNewCity = $ReadOnly<{
    isCityBeingCreated: boolean,
}>;

export type ClientStateMenu = $ReadOnly<{
    newCity: ClientStateNewCity,
    cityView: ClientStateCityView,
}>;

export type ClientStatePlayer = $ReadOnly<{
    name: ?string,
}>;

export type TileType = 'CITY' | 'PLAINS';

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


export type ClientState = $ReadOnly<{
    camera: ClientStateCamera,
    menu: ClientStateMenu,
    player: ClientStatePlayer,
    commonState: ?CommonState,
    tiles: ClientStateTiles,
}>;

const emptyCameraState: ClientStateCamera = {
    locationLimit: {
        min: zeroVector,
        max: zeroVector,
    },
    geometry: {
        location: zeroVector,
        size: zeroVector,
    },
    movementSpeed: zeroVector,
    sizeLimit: {
        min: zeroVector,
        max: zeroVector,
    },
    zoomingSpeed: zeroVector,
};

const initialCameraState: ClientStateCamera = {
    geometry: {
        location: {
            x: 0,
            y: 0,
        },
        size: {
            x: 1280,
            y: 800,
        },
    },
    locationLimit: {
        min: zeroVector,
        max: zeroVector,
    },
    movementSpeed: {
        x: 0.1,
        y: 0.1,
    },
    sizeLimit: {
        min: { x: 640, y: 400 },
        max: { x: 3200, y: 2000 },
    },
    zoomingSpeed: {
        x: 100,
        y: 100,
    },
};

const emptyMenuState: ClientStateMenu = {
    newCity: {
        isCityBeingCreated: false,
    },
    cityView: {
        currentCityId: null,
        tab: TAB_OVERVIEW,
        unit: UNIT_PEASANT,
    },
};

const initialMenuState: ClientStateMenu = {
    newCity: {
        isCityBeingCreated: false,
    },
    cityView: {
        currentCityId: null,
        tab: TAB_OVERVIEW,
        unit: UNIT_PEASANT,
    },
};

const emptyPlayerState: ClientStatePlayer = {
    name: null,
};

const initialPlayerState: ClientStatePlayer = {
    name: null,
};

const emptyCommonState: ?CommonState = null;
const initialCommonState: ?CommonState = null;

const emptyTilesState: ClientStateTiles = {
    city: Object.freeze({}),
    terrain: [],
};

const initialTilesState: ClientStateTiles = {
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

export const emptyClientState: ClientState = {
    camera: emptyCameraState,
    menu: emptyMenuState,
    player: emptyPlayerState,
    commonState: emptyCommonState,
    tiles: emptyTilesState,
};

export const initialClientState: ClientState = {
    camera: initialCameraState,
    menu: initialMenuState,
    player: initialPlayerState,
    commonState: initialCommonState,
    tiles: initialTilesState,
};

