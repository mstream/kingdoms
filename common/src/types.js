/**
 * @flow
 */

export type Vector = {
    x: number,
    y: number,
}

export type Geometry = {
    location: Vector,
    size: Vector
};

export type Boundary = {
    min: Vector,
    max: Vector,
};

export type ResourceType = 'FOOD' | 'WOOD'

type Resource = {
    type: ResourceType,
    quantity: number
};

type City = {
    id: string, name: string, location: Vector, resources: $ReadOnlyArray<Resource>
};

export type ServerState = {
    cities: $ReadOnlyArray<City>,
    worldSizeInTiles: Vector
}
