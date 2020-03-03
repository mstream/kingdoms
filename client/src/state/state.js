// @flow

import type {ServerState} from '../../../common/src/state';
import type {Geometry} from '../../../common/src/geometry';
import type {Vector} from '../../../common/src/vector';
import type {Boundary} from '../../../common/src/boundary';

export type ClientStateCamera = {
    locationLimit: Boundary,
    geometry: Geometry,
    movementSpeed: Vector,
    sizeLimit: Boundary,
    zoomingSpeed: Vector,
};

export type ClientStateMenu = {
    newCity: {
        isOpen: boolean,
        isCityBeingCreated: boolean,
    },
    cityView: {
        currentCityId: ?string,
        nextCityId: ?string,
        previousCityId: ?string,
    },
};

export type ClientStatePlayer = {
    name: ?string,
};

export type TileType = 'CITY' | 'PLAINS';

export type ClientStateTile = {
    geometry: Geometry,
    index: Vector,
    textureIndex: number,
    type: TileType,
};

export type ClientStateCityTiles = { [string]: ClientStateTile };
export type ClientStateTerrainTiles = $ReadOnlyArray<ClientStateTile>;

export type ClientStateTiles = {
    city: ClientStateCityTiles,
    terrain: ClientStateTerrainTiles,
};


export type ClientState = {
    camera: ClientStateCamera,
    menu: ClientStateMenu,
    player: ClientStatePlayer,
    serverState: ?ServerState,
    tiles: ClientStateTiles,
};

const emptyCameraState: ClientStateCamera = {
    locationLimit: {
        min: {x: 0, y: 0,},
        max: {x: 0, y: 0,},
    },
    geometry: {
        location: {x: 0, y: 0,},
        size: {x: 0, y: 0,},
    },
    movementSpeed: {x: 0, y: 0,},
    sizeLimit: {
        min: {x: 0, y: 0,},
        max: {x: 0, y: 0,},
    },
    zoomingSpeed: {x: 0, y: 0,},
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
        min: {x: 0, y: 0},
        max: {x: 0, y: 0},
    },
    movementSpeed: {
        x: 0.1,
        y: 0.1,
    },
    sizeLimit: {
        min: {x: 640, y: 400},
        max: {x: 3200, y: 2000},
    },
    zoomingSpeed: {
        x: 100,
        y: 100,
    },
};

const emptyMenuState: ClientStateMenu = {
    newCity: {
        isOpen: false,
        isCityBeingCreated: false,
    },
    cityView: {
        currentCityId: null,
        nextCityId: null,
        previousCityId: null,
    },
};

const initialMenuState: ClientStateMenu = {
    newCity: {
        isOpen: false,
        isCityBeingCreated: false,
    },
    cityView: {
        currentCityId: null,
        nextCityId: null,
        previousCityId: null,
    },
};

const emptyPlayerState: ClientStatePlayer = {
    name: null,
};

const initialPlayerState: ClientStatePlayer = {
    name: null,
};

const emptyServerState: ?ServerState = null;
const initialServerState: ?ServerState = null;

const emptyTilesState: ClientStateTiles = {
    city: Object.freeze({}),
    terrain: [],
};

const initialTilesState: ClientStateTiles = {
    city: Object.freeze({}),
    terrain: [],
};

export const emptyClientState: ClientState = {
    camera: emptyCameraState,
    menu: emptyMenuState,
    player: emptyPlayerState,
    serverState: emptyServerState,
    tiles: emptyTilesState,
};

export const initialClientState: ClientState = {
    camera: initialCameraState,
    menu: initialMenuState,
    player: initialPlayerState,
    serverState: initialServerState,
    tiles: initialTilesState,
};

