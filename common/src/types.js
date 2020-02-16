/**
 * @flow
 */

export type Vector = {
    x: number,
    y: number,
};

export type Geometry = {
    location: Vector,
    size: Vector,
};

export type Boundary = {
    min: Vector,
    max: Vector,
};

export type ResourceType = 'FOOD' | 'WOOD';

type Resource = {
    type: ResourceType,
    quantity: number,
};

type City = {
    id: string,
    location: Vector,
    name: string,
    ownerId: string,
    resources: $ReadOnlyArray<Resource>,
};

export type ServerState = {
    cities: $ReadOnlyArray<City>,
    time: ?string,
    worldSizeInTiles: Vector,
};
