/**
 * @flow
 */

import {calculateNextCitySpot} from './state';
import {areVectorsEqual} from './vector';

describe('calculateNextCitySpot', () => {
    it('chooses the center of an empty map', () => {
        const minimalCityMargin = {x: 1, y: 1};
        const takenSpots = [];
        const worldSize = {x: 3, y: 3};
        const expected = {x: 0, y: 0};
        const actual = calculateNextCitySpot({
            minimalCityMargin,
            takenSpots,
            worldSize
        });
        expect(actual).toEqual(expected);
    });

    it('prioritizes spots closest to the center', () => {
        const minimalCityMargin = {x: 1, y: 1};
        const takenSpots = [{x: 0, y: 0}];
        const worldSize = {x: 3, y: 3};
        const expectedAlternatives = [
            {x: 0, y: -2},
            {x: 2, y: 0},
            {x: 0, y: 2},
            {x: -2, y: 0}
        ];
        const actual = calculateNextCitySpot({
            minimalCityMargin,
            takenSpots,
            worldSize
        });

        expect(expectedAlternatives.find(expected => {
            return actual != null && areVectorsEqual({
                vector1: expected,
                vector2: actual
            });
        })).not.toBeUndefined();
    });

    it('returns null when there are no valid spots left', () => {
        const minimalCityMargin = {x: 1, y: 1};
        const takenSpots = [
            {x: 0, y: 0},
            {x: 0, y: -2},
            {x: 2, y: 0},
            {x: 0, y: 2},
            {x: -2, y: 0},
            {x: -2, y: -2},
            {x: 2, y: -2},
            {x: 2, y: 2},
            {x: -2, y: 2}
        ];
        const worldSize = {x: 3, y: 3};
        const expected = null;
        const actual = calculateNextCitySpot({
            minimalCityMargin,
            takenSpots,
            worldSize
        });
        expect(actual).toEqual(expected);
    });
});
