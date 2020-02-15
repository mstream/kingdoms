/**
 * @flow
 */

import type {Vector} from './types';


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

export const multipleVectors = ({vector1, vector2}: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x * vector2.x,
        y: vector1.y * vector2.y
    };
};

export const divideVectors = ({vector1, vector2}: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x / vector2.x,
        y: vector1.y / vector2.y
    };
};

export const negateVector = ({vector}: { vector: Vector }): Vector => {
    return {
        x: -vector.x,
        y: -vector.y
    };
};
