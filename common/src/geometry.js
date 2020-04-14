// @flow

import type {
    Vector,
} from './vector';

export type Geometry = $ReadOnly< {
    location: Vector,
    size: Vector,
} >;

export const checkIfIntersect = (
    {
        geometry1,
        geometry2,
    }: {
    geometry1: Geometry,
    geometry2: Geometry,
},
): boolean => {

    return (
        Math.abs(
            geometry1.location.x - geometry2.location.x,
        )
        < ( geometry1.size.x + geometry2.size.x ) / 2
        && Math.abs(
            geometry1.location.y - geometry2.location.y,
        )
        < ( geometry1.size.y + geometry2.size.y ) / 2
    );

};
