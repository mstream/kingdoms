// @flow

import {
    addVectors,
    areVectorsEqual,
    divideVectors,
    getDistanceBetweenVectors,
    multipleVectors,
    negateVector,
    subtractVectors,
} from './vector';
import type { Vector } from './vector';

describe('areVectorsEqual', () => {
    it('returns true when both vectors have both coordinates equal', () => {
        const vector1 = { x: 1, y: 1 };
        const vector2 = { x: 1, y: 1 };
        const expected = true;
        const actual = areVectorsEqual({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });

    it('returns false when x coordinates differ', () => {
        const vector1 = { x: 1, y: 1 };
        const vector2 = { x: 2, y: 1 };
        const expected = false;
        const actual = areVectorsEqual({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });

    it('returns false when y coordinates differ', () => {
        const vector1 = { x: 1, y: 1 };
        const vector2 = { x: 1, y: 2 };
        const expected = false;
        const actual = areVectorsEqual({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });
});

describe('negateVector', () => {
    it('returns a vector with both coordinates negated', () => {
        const vector = { x: 1, y: -1 };
        const expected = { x: -1, y: 1 };
        const actual = negateVector({
            vector,
        });
        expect(actual).toEqual(expected);
    });
});

describe('addVectors', () => {
    it('returns a vector with coordinates being sum of corresponding coordinates', () => {
        const vector1 = { x: 1, y: 2 };
        const vector2 = { x: 3, y: 4 };
        const expected = { x: 4, y: 6 };
        const actual = addVectors({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });
});

describe('subtractVectors', () => {
    it('returns a vector with coordinates being difference of corresponding coordinates', () => {
        const vector1 = { x: 4, y: 3 };
        const vector2 = { x: 2, y: 1 };
        const expected = { x: 2, y: 2 };
        const actual = subtractVectors({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });
});

describe('multipleVectors', () => {
    it('returns a vector with coordinates being product of corresponding coordinates', () => {
        const vector1 = { x: 1, y: 2 };
        const vector2 = { x: 3, y: 4 };
        const expected = { x: 3, y: 8 };
        const actual = multipleVectors({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });
});

describe('divideVectors', () => {
    it('returns a vector with coordinates being quotient of corresponding coordinates', () => {
        const vector1 = { x: 4, y: 3 };
        const vector2 = { x: 2, y: 1 };
        const expected = { x: 2, y: 3 };
        const actual = divideVectors({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });
});

describe('getDistanceBetweenVectors', () => {
    it('returns a distance between two vectors', () => {
        const vector1 = { x: 0, y: 0 };
        const vector2 = { x: 3, y: 4 };
        const expected = 5;
        const actual = getDistanceBetweenVectors({
            vector1,
            vector2,
        });
        expect(actual).toEqual(expected);
    });
});
