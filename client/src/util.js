/**
 * @flow
 */

import type {Geometry, GeometryStyle, Vector} from './types';

export const createGeometryStyle = ({debugColor, geometry}: { debugColor?: string, geometry: Geometry }): GeometryStyle => {
    const style = {
        position: 'absolute',
        height: geometry.size.y,
        width: geometry.size.x,
        marginTop: geometry.location.y - geometry.size.y / 2,
        marginLeft: geometry.location.x - geometry.size.x / 2,
    };
    return debugColor == null ? style : {
        ...style,
        borderStyle: 'solid',
        borderColor: debugColor
    };
};

export const checkIfIntersect = ({geometry1, geometry2}: { geometry1: Geometry, geometry2: Geometry }): boolean => {
    return Math.abs(geometry1.location.x - geometry2.location.x) < (geometry1.size.x + geometry2.size.x) / 2 &&
        Math.abs(geometry1.location.y - geometry2.location.y) < (geometry1.size.y + geometry2.size.y) / 2;
};

export const translateLocation = ({location, vector}: { location: Vector, vector: Vector }): Vector => {
    return {
        x: location.x + vector.x,
        y: location.y + vector.y
    };
};

export const translateSize = ({size, vector}: { size: Vector, vector: Vector }): Vector => {
    return {
        x: size.x * vector.x,
        y: size.y * vector.y
    };
};

export const addVectors = ({vector1, vector2}: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
    };
};

export const subtractVectors = ({vector1, vector2}: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y,
    };
};

export const scaleVector = ({vector, scalar}: { vector: Vector, scalar: number }): Vector => {
    return {
        x: vector.x * scalar,
        y: vector.y * scalar,
    };
};