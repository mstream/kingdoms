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


describe(
    `areVectorsEqual`,
    () => {

        it(
            `returns true when both vectors have both cords equal`,
            () => {

                const vector1 = {
                    x: 1,
                    y: 1,
                };

                const vector2 = {
                    x: 1,
                    y: 1,
                };
                const expected = true;
                const actual = areVectorsEqual(
                    {
                        vector1,
                        vector2,
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
            `returns false when x cords differ`,
            () => {

                const vector1 = {
                    x: 1,
                    y: 1,
                };

                const vector2 = {
                    x: 2,
                    y: 1,
                };
                const expected = false;
                const actual = areVectorsEqual(
                    {
                        vector1,
                        vector2,
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
            `returns false when y cords differ`,
            () => {

                const vector1 = {
                    x: 1,
                    y: 1,
                };

                const vector2 = {
                    x: 1,
                    y: 2,
                };
                const expected = false;
                const actual = areVectorsEqual(
                    {
                        vector1,
                        vector2,
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
    `negateVector`,
    () => {

        it(
            `returns a vector with both cords negated`,
            () => {

                const vector = {
                    x: 1,
                    y: -1,
                };

                const expected = {
                    x: -1,
                    y: 1,
                };

                const actual = negateVector(
                    {
                        vector,
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
    `addVectors`,
    () => {

        it(
            `returns a vector with cords being sum of corresponding cords`,
            () => {

                const vector1 = {
                    x: 1,
                    y: 2,
                };

                const vector2 = {
                    x: 3,
                    y: 4,
                };

                const expected = {
                    x: 4,
                    y: 6,
                };

                const actual = addVectors(
                    {
                        vector1,
                        vector2,
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
    `subtractVectors`,
    () => {

        it(
            `returns a vector with cords being difference of corresponding cords`,
            () => {

                const vector1 = {
                    x: 4,
                    y: 3,
                };

                const vector2 = {
                    x: 2,
                    y: 1,
                };

                const expected = {
                    x: 2,
                    y: 2,
                };

                const actual = subtractVectors(
                    {
                        vector1,
                        vector2,
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
    `multipleVectors`,
    () => {

        it(
            `returns a vector with cords being product of corresponding cords`,
            () => {

                const vector1 = {
                    x: 1,
                    y: 2,
                };

                const vector2 = {
                    x: 3,
                    y: 4,
                };

                const expected = {
                    x: 3,
                    y: 8,
                };

                const actual = multipleVectors(
                    {
                        vector1,
                        vector2,
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
    `divideVectors`,
    () => {

        it(
            `returns a vector with cords being quotient of corresponding cords`,
            () => {

                const vector1 = {
                    x: 4,
                    y: 3,
                };

                const vector2 = {
                    x: 2,
                    y: 1,
                };

                const expected = {
                    x: 2,
                    y: 3,
                };

                const actual = divideVectors(
                    {
                        vector1,
                        vector2,
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
    `getDistanceBetweenVectors`,
    () => {

        it(
            `returns a distance between two vectors`,
            () => {

                const vector1 = {
                    x: 0,
                    y: 0,
                };

                const vector2 = {
                    x: 3,
                    y: 4,
                };
                const expected = 5;
                const actual = getDistanceBetweenVectors(
                    {
                        vector1,
                        vector2,
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
