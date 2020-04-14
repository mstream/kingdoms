// @flow

import {
    numberToQuantityString,
} from './utils';

describe(
    `numberToQuantityString`,
    () => {

        it(
            `return a number as it is if it is lower than 10 000`,
            () => {

                const value = 9999;
                const expected = `9999`;
                const actual = numberToQuantityString(
                    {
                        value,
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
            `adds a metric prefix if number is higher than 10 000`,
            () => {

                const value = 10500;
                const expected = `10.5k`;
                const actual = numberToQuantityString(
                    {
                        value,
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
            `millions`,
            () => {

                const value = 50000000;
                const expected = `50m`;
                const actual = numberToQuantityString(
                    {
                        value,
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
