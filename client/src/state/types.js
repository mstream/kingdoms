/**
 * @flow
 */

import type {Boundary, Geometry, ResourceType, Vector} from '../../../common/src/types';

export type ClientStateCamera = {
    locationLimit: Boundary,
    geometry: Geometry,
    movementSpeed: Vector,
    sizeLimit: Boundary,
    zoomingSpeed: Vector,
};

export type ClientStateEntity = {
    id: string,
    ...
};


export type ClientStateResource = {
    type: ResourceType,
    quantity: number
};

export type ClientStateCity = ClientStateEntity & {
    geometry: Geometry,
    name: string,
    resources: $ReadOnlyArray<ClientStateResource>,
    ...
};

export type ClientStateMenu = {
    viewedCityId: ?string
}

export type TileType = 'PLAINS';

export type ClientStateTile = {
    geometry: Geometry,
    index: Vector,
    type: TileType,
};

export type ClientState = {
    camera: ClientStateCamera,
    citiesById: { [string]: ClientStateCity },
    menu: ClientStateMenu,
    tiles: $ReadOnlyArray<ClientStateTile>,
};
