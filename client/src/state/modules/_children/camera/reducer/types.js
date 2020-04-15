// @flow

import type {
    Boundary,
} from '../../../../../../../common/src/boundary';
import type {
    Geometry,
} from '../../../../../../../common/src/geometry';
import type {
    Vector,
} from '../../../../../../../common/src/vector';

export type ClientStateCamera = {
    locationLimit: Boundary,
    geometry: Geometry,
    movementSpeed: Vector,
    sizeLimit: Boundary,
    zoomingSpeed: Vector,
};
