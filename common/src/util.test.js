// @flow

import { numberToDurationString, numberToQuantityString } from './util';

describe('numberToQuantityString', () => {
    it('return a number as it is if it is lower than 10 000', () => {
        const value = 9999;
        const expected = '9999';
        const actual = numberToQuantityString({
            value,
        });
        expect(actual).toEqual(expected);
    });

    it('adds a metric prefix if number is higher than 10 000', () => {
        const value = 10500;
        const expected = '10.5k';
        const actual = numberToQuantityString({
            value,
        });
        expect(actual).toEqual(expected);
    });

    it('millions', () => {
        const value = 50000000;
        const expected = '50m';
        const actual = numberToQuantityString({
            value,
        });
        expect(actual).toEqual(expected);
    });
});

describe('numberToDurationString', () => {
    it('0', () => {
        const value = 0;
        const expected = '0';
        const actual = numberToDurationString({
            value,
        });
        expect(actual).toEqual(expected);
    });

    it('59', () => {
        const value = 59;
        const expected = '59m';
        const actual = numberToDurationString({
            value,
        });
        expect(actual).toEqual(expected);
    });

    it('60', () => {
        const value = 60;
        const expected = '1h';
        const actual = numberToDurationString({
            value,
        });
        expect(actual).toEqual(expected);
    });

    it('61', () => {
        const value = 61;
        const expected = '1h 1m';
        const actual = numberToDurationString({
            value,
        });
        expect(actual).toEqual(expected);
    });
});
