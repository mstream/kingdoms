// @flow

import {
    validateCityName, validateTime,
} from './index';

describe(
    `validateCityName`,
    () => {

        it(
            `proper name`,
            () => {

                const name = `Abc`;
                const expected = [];

                const actual = validateCityName(
                    {
                        name,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

        it(
            `name too short`,
            () => {

                const name = `Ab`;
                const expected = [
                    `the city name is too short`,
                ];

                const actual = validateCityName(
                    {
                        name,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

        it(
            `name too long`,
            () => {

                const name = `AbcdeAbcdeAbcdeAbcdeAbcde`;
                const expected = [
                    `the city name is too long`,
                ];

                const actual = validateCityName(
                    {
                        name,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

        it(
            `not uppercase`,
            () => {

                const name = `abc`;
                const expected = [
                    `the city name does not follow the convention`,
                ];

                const actual = validateCityName(
                    {
                        name,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

    },
);

describe(
    `validateTime`,
    () => {

        it(
            `valid format`,
            () => {

                const time = `2000-01-01:00:00.000Z`;
                const expected = [];

                const actual = validateTime(
                    {
                        time,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

        it(
            `invalid format`,
            () => {

                const time = `INVALID_TIME_FORMAT`;
                const expected = [
                    `time does not have a valid format`,
                ];

                const actual = validateTime(
                    {
                        time,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

    },
);
