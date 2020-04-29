// @flow


import {
    createGeometryStyle,
} from './index';
import type {
    Geometry,
} from '../../../common/src/geometry';
import type {
    GeometryStyle,
} from './types';

describe(
    `createGeometryStyle`,
    () => {

        it(
            `creates a proper style`,
            () => {

                const geometry: Geometry = {
                    location: {
                        x: 0,
                        y: 0,
                    },
                    size: {
                        x: 20,
                        y: 10,
                    },
                };

                const expected: GeometryStyle = {
                    height    : 10,
                    marginLeft: -10,
                    marginTop : -5,
                    width     : 20,
                };

                const actual = createGeometryStyle(
                    {
                        geometry,
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
    `tileVectorToPixelVector`,
    () => {

        it(
            `translates tile scale vector to pixel scale vector`,
            () => {

                const geometry: Geometry = {
                    location: {
                        x: 0,
                        y: 0,
                    },
                    size: {
                        x: 20,
                        y: 10,
                    },
                };

                const expected: GeometryStyle = {
                    height    : 10,
                    marginLeft: -10,
                    marginTop : -5,
                    width     : 20,
                };

                const actual = createGeometryStyle(
                    {
                        geometry,
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
