// @flow

import type {
    Vector,
} from '../../../../../../../common/src/vector';
import type {
    Boundary,
} from '../../../../../../../common/src/boundary';
import type {
    Geometry,
} from '../../../../../../../common/src/geometry';

export type ClientStateCamera = {
    locationLimit: Boundary,
    geometry: Geometry,
    movementSpeed: Vector,
    sizeLimit: Boundary,
    zoomingSpeed: Vector,
};
