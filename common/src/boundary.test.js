// @flow

import {clipToBoundary} from './boundary';

describe('clipToBoundary', () => {
    it('returns same vector when both coordinates are within the boundary', () => {
        const vector = {x: 1, y: 1};
        const boundary = {
            max: {
                x: 3,
                y: 2,
            },
            min: {
                x: -3,
                y: -2,
            },
        };
        const expected = {x: 1, y: 1};
        const actual = clipToBoundary({
            boundary,
            vector,
        });
        expect(actual).toEqual(expected);
    });

    it('returns same vector with clipped x if too small', () => {
        const vector = {x: -5, y: 1};
        const boundary = {
            max: {
                x: 3,
                y: 2,
            },
            min: {
                x: -3,
                y: -2,
            },
        };
        const expected = {x: -3, y: 1};
        const actual = clipToBoundary({
            boundary,
            vector,
        });
        expect(actual).toEqual(expected);
    });

    it('returns same vector with clipped x if too big', () => {
        const vector = {x: 5, y: 1};
        const boundary = {
            max: {
                x: 3,
                y: 2,
            },
            min: {
                x: -3,
                y: -2,
            },
        };
        const expected = {x: 3, y: 1};
        const actual = clipToBoundary({
            boundary,
            vector,
        });
        expect(actual).toEqual(expected);
    });

    it('returns same vector with clipped y if too small', () => {
        const vector = {x: 1, y: -5};
        const boundary = {
            max: {
                x: 3,
                y: 2,
            },
            min: {
                x: -3,
                y: -2,
            },
        };
        const expected = {x: 1, y: -2};
        const actual = clipToBoundary({
            boundary,
            vector,
        });
        expect(actual).toEqual(expected);
    });

    it('returns same vector with clipped y if too big', () => {
        const vector = {x: 1, y:51};
        const boundary = {
            max: {
                x: 3,
                y: 2,
            },
            min: {
                x: -3,
                y: -2,
            },
        };
        const expected = {x: 1, y: 2};
        const actual = clipToBoundary({
            boundary,
            vector,
        });
        expect(actual).toEqual(expected);
    });
});
