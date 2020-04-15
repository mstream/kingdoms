// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    Geometry,
} from '../../../../../../../../common/src/geometry';

export const geometrySelector: ClientStateSelector< Geometry > = (
    state,
) => {

    return state.camera.geometry;

};
