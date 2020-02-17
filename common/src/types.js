/**
 * @flow
 */

import type {Vector} from './vector';

export type ResourceType = 'FOOD' | 'WOOD';

export type BuildingType = 'LUMBER_MILL' | 'PASTURE';

export type CitizenType = 'PEASANT';

type ServerStateResource = {
    type: ResourceType,
    quantity: number,
};

type ServerStateBuilding = {
    type: BuildingType,
    tier: number,
};

type ServerStateCitizen = {
    type: CitizenType,
    quantity: number
};

type ServerStateCity = {
    buildings: $ReadOnlyArray<ServerStateBuilding>,
    citizens: $ReadOnlyArray<ServerStateCitizen>,
    id: string,
    location: Vector,
    name: string,
    ownerId: string,
    resources: $ReadOnlyArray<ServerStateResource>,
};

export type ServerState = {
    cities: $ReadOnlyArray<ServerStateCity>,
    time: ?string,
    worldSizeInTiles: Vector,
};
