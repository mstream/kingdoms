// @flow

import type {
    Geometry,
} from '../../../common/src/geometry';
import type {
    Vector,
} from '../../../common/src/vector';
import {
    multipleVectors,
} from '../../../common/src/vector';
import type {
    GeometryStyle,
} from './types';

const tileSize = {
    x: 64,
    y: 64,
};

export const createGeometryStyle = (
    {
        geometry,
    }: {
        geometry: Geometry,
    },
): GeometryStyle => {

    return {
        height    : geometry.size.y,
        marginLeft: ( geometry.location.x - geometry.size.x ) / 2,
        marginTop : ( geometry.location.y - geometry.size.y ) / 2,
        width     : geometry.size.x,
    };

};

export const getRefValue = <T>( {
    ref,
}: { ref: { current: ?T } }, ): T => {

    if ( ref.current == null ) {

        throw Error(
            `ref durationInMinutes not set`,
        );

    }
    return ref.current;

};

export const tileVectorToPixelVector = (
    {
        tileVector,
    }: {
        tileVector: Vector,
    },
): Vector => {

    return multipleVectors(
        {
            vector1: tileVector,
            vector2: tileSize,
        },
    );

};

