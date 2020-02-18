/**
 * @flow
 */

import type {Vector} from './vector';

type ServerStateBuilding = {
    tier: number,
};

type ServerStateCitizen = {
    quantity: number
};

type ServerStateResource = {
    quantity: number,
};

type ServerStateBuildings = {
    lumberMill: ServerStateBuilding,
    pasture: ServerStateBuilding
}

type ServerStateCitizens = {
    peasant: ServerStateCitizen
}

type ServerStateResources = {
    food: ServerStateResource,
    wood: ServerStateResource
}

type ServerStateCity = {
    buildings: ServerStateBuildings,
    citizens: ServerStateCitizens,
    id: string,
    location: Vector,
    name: string,
    ownerId: string,
    resources: ServerStateResources,
};

export type ServerStateCities = $ReadOnlyArray<ServerStateCity>;

export type ServerState = {
    cities: ServerStateCities,
    time: ?string,
    worldSizeInTiles: Vector,
};
