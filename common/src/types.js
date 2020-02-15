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

type City = {
    id: string, name: string, location: Vector
};

export type ServerState = {
    cities: $ReadOnlyArray<City>,
    worldSizeInTiles: Vector
}
