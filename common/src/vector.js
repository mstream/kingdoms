// @flow
// @flow-runtime

export type Vector = $ReadOnly<{
    x: number,
    y: number,
}>;

export const zeroVector: Vector = {
    x: 0,
    y: 0,
};

export const addVectors = ({ vector1, vector2 }: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
    };
};

export const subtractVectors = ({ vector1, vector2 }: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y,
    };
};

export const multipleVectors = ({ vector1, vector2 }: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x * vector2.x,
        y: vector1.y * vector2.y,
    };
};

export const divideVectors = ({ vector1, vector2 }: { vector1: Vector, vector2: Vector }): Vector => {
    return {
        x: vector1.x / vector2.x,
        y: vector1.y / vector2.y,
    };
};

export const negateVector = ({ vector }: { vector: Vector }): Vector => {
    return {
        x: -vector.x,
        y: -vector.y,
    };
};

export const getDistanceBetweenVectors = ({ vector1, vector2 }: { vector1: Vector, vector2: Vector }): number => {
    const xDiff = vector1.x - vector2.x;
    const yDiff = vector1.y - vector2.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};

export const areVectorsEqual = ({ vector1, vector2 }: { vector1: Vector, vector2: Vector }): boolean => {
    return vector1.x === vector2.x && vector1.y === vector2.y;
};
