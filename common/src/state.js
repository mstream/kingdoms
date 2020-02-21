/**
 * @flow
 */

import type {Vector} from './vector';

export type ChangeInfo = { [string]: number, ... };

type Dynamic = {
    changeInfo: ChangeInfo,
    quantity: number,
};

export type CommonStateBuilding = {
    tier: number,
};

export type CommonStateCitizen = Dynamic & {
    quantity: number,
    ...
};

export type CommonStateResource = Dynamic & {
    quantity: number,
    ...
};

export type CommonStateBuildings = {
    lumberMill: CommonStateBuilding,
    pasture: CommonStateBuilding
}

export type CommonStateCitizens = {
    peasant: CommonStateCitizen
}

export type CommonStateResources = {
    food: CommonStateResource,
    wood: CommonStateResource
}

export type ServerStateCity = {
    buildings: CommonStateBuildings,
    citizens: CommonStateCitizens,
    id: string,
    location: Vector,
    name: string,
    ownerId: string,
    resources: CommonStateResources,
};

export type ServerStateCities = $ReadOnlyArray<ServerStateCity>;

export type ServerState = {
    cities: ServerStateCities,
    time: ?string,
    worldSizeInTiles: Vector,
};
