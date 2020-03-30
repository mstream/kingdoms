// @flow

import { minutesToDurationString, translateTime } from './time';

describe('numberToDurationString', () => {
    it('0', () => {
        const value = 0;
        const expected = '0';
        const actual = minutesToDurationString({
            durationInMinutes: value,
        });
        expect(actual).toEqual(expected);
    });

    it('59', () => {
        const value = 59;
        const expected = '59m';
        const actual = minutesToDurationString({
            durationInMinutes: value,
        });
        expect(actual).toEqual(expected);
    });

    it('60', () => {
        const value = 60;
        const expected = '1h';
        const actual = minutesToDurationString({
            durationInMinutes: value,
        });
        expect(actual).toEqual(expected);
    });

    it('61', () => {
        const value = 61;
        const expected = '1h 1m';
        const actual = minutesToDurationString({
            durationInMinutes: value,
        });
        expect(actual).toEqual(expected);
    });
});

describe('translateTime', () => {
    it('forward', () => {
        const deltaInMinutes = 60;
        const time = '2000-01-01T02:00:00.000Z';

        const expected = '2000-01-01T03:00:00.000Z';

        const actual = translateTime({
            deltaInMinutes,
            time,
        });

        expect(actual).toEqual(expected);
    });

    it('backward', () => {
        const deltaInMinutes = -60;

        const time = '2000-01-01T02:00:00.000Z';

        const expected = '2000-01-01T01:00:00.000Z';

        const actual = translateTime({
            deltaInMinutes,
            time,
        });

        expect(actual).toEqual(expected);
    });
});
