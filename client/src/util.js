/**
 * @flow
 */

import type {Geometry} from '../../common/src/types';
import type {GeometryStyle} from './types';

export const createGeometryStyle = ({geometry}: { geometry: Geometry }): GeometryStyle => {
    return {
        height: geometry.size.y,
        width: geometry.size.x,
        marginTop: geometry.location.y - geometry.size.y / 2,
        marginLeft: geometry.location.x - geometry.size.x / 2,
    };
};
