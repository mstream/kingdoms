/**
 * @flow
 */

import type {Boundary, Vector} from './types';

export const clipToBoundary = ({vector, boundary}: { vector: Vector, boundary: Boundary }): Vector => {
    return {
        x: Math.max(boundary.min.x, Math.min(boundary.max.x, vector.x)),
        y: Math.max(boundary.min.y, Math.min(boundary.max.y, vector.y)),
    };
};
