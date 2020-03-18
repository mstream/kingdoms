// @flow

import {
    commonStateCitiesSelector,
    nextCitySpotSelector,
} from './common-state';
import { areVectorsEqual, zeroVector } from '../vector';
import type { CommonStateCities } from '../state/modules/cities/reducer/types';
import type { CommonState } from '../state/modules/types';
import { emptyCommonState } from '../state/modules/state';
import { emptyCityState } from '../state/modules/cities/reducer/state';

describe('commonStateCitiesSelector', () => {
    it('returns all the cities', () => {
        const state: CommonState = {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                '1': {
                    ...emptyCityState,
                },
                '2': {
                    ...emptyCityState,
                },
            },
        };

        const expected: CommonStateCities = {
            '1': {
                ...emptyCityState,
            },
            '2': {
                ...emptyCityState,
            },
        };

        const actual = commonStateCitiesSelector(state);

        expect(actual).toEqual(expected);
    });
});


describe('nextCitySpotSelector', () => {
    it('chooses the center of an empty map', () => {
        const state: CommonState = {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
            },
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: { x: 1, y: 1 },
            },
            world: {
                ...emptyCommonState.world,
                size: {
                    x: 3,
                    y: 3,
                },
            },
        };

        const expected = zeroVector;

        const actual = nextCitySpotSelector(state);

        expect(actual).toEqual(expected);
    });

    it('prioritizes spots closest to the center', () => {
        const state: CommonState = {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                '1': {
                    ...emptyCityState,
                    location: zeroVector,
                },
            },
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: { x: 1, y: 1 },
            },
            world: {
                ...emptyCommonState.world,
                size: {
                    x: 3,
                    y: 3,
                },
            },
        };

        const expectedAlternatives = [
            { x: 0, y: -2 },
            { x: 2, y: 0 },
            { x: 0, y: 2 },
            { x: -2, y: 0 },
        ];

        const actual = nextCitySpotSelector(state);

        expect(expectedAlternatives.find(expected => {
            return actual != null && areVectorsEqual({
                vector1: expected,
                vector2: actual,
            });
        })).not.toBeUndefined();
    });

    it('returns null when there are no valid spots left', () => {
        const state: CommonState = {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                '1': {
                    ...emptyCityState,
                    location: zeroVector,
                },
                '2': {
                    ...emptyCityState,
                    location: { x: 0, y: -2 },
                },
                '3': {
                    ...emptyCityState,
                    location: { x: 2, y: 0 },
                },
                '4': {
                    ...emptyCityState,
                    location: { x: 0, y: 2 },
                },
                '5': {
                    ...emptyCityState,
                    location: { x: -2, y: 0 },
                },
                '6': {
                    ...emptyCityState,
                    location: { x: -2, y: -2 },
                },
                '7': {
                    ...emptyCityState,
                    location: { x: 2, y: -2 },
                },
                '8': {
                    ...emptyCityState,
                    location: { x: 2, y: 2 },
                },
                '9': {
                    ...emptyCityState,
                    location: { x: -2, y: 2 },
                },
            },
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: { x: 1, y: 1 },
            },
            world: {
                ...emptyCommonState.world,
                size: {
                    x: 3,
                    y: 3,
                },
            },
        };

        const expected = null;

        const actual = nextCitySpotSelector(state);

        expect(actual).toEqual(expected);
    });
});
