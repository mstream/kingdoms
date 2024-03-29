// @flow

import {
    addVectors,
    getDistanceBetweenVectors,
    zeroVector,
} from '../../../../vector';
import {
    citiesSelector,
} from '../../_children/cities/selectors/_impl/cities';
import {
    commonStateRulesSelectors,
} from '../../_children/rules/selectors';
import {
    commonStateWorldSelectors,
} from '../../_children/world/selectors';
import {
    createSelector,
} from 'reselect';
import type {
    CommonState,
} from '../../types';
import type {
    CommonStateCities,
} from '../../_children/cities/reducer/types';
import type {
    CommonStateRules,
} from '../../_children/rules/reducer/types';
import type {
    CommonStateWorld,
} from '../../_children/world/reducer/types';
import type {
    Vector,
} from '../../../../vector';

export const nextCitySpotSelector = createSelector<CommonState,
    void,
    ?Vector,
    CommonStateCities,
    CommonStateRules,
    CommonStateWorld,
    >(
        citiesSelector,
        commonStateRulesSelectors.rules,
        commonStateWorldSelectors.world,
        (
            cities, rules, world,
        ) => {

            const takenSpots = Object.keys(
                cities,
            )
                .map(
                    (
                        cityId,
                    ) => {

                        return cities[ cityId ].location;

                    },
                );

            const generateLocationHash = (
                {
                    location,
                }: {
                location: Vector,
            },
            ): string => {

                return `${ location.x }_${ location.y }`;

            };

            const isSpotValid = (
                {
                    location,
                }: { location: Vector },
            ): boolean => {

                for (
                    let yOffset = -rules.minimalCityMargin.y;
                    yOffset <= rules.minimalCityMargin.y;
                    yOffset += 1
                ) {

                    for (
                        let xOffset = -rules.minimalCityMargin.x;
                        xOffset <= rules.minimalCityMargin.x;
                        xOffset += 1
                    ) {

                        const offset = {
                            x: xOffset,
                            y: yOffset,
                        };

                        const neighbouringTileLocation = addVectors(
                            {
                                vector1: location,
                                vector2: offset,
                            },
                        );

                        if ( neighbouringTileLocation.x < -world.size.x ) {

                            return false;

                        }

                        if ( neighbouringTileLocation.x > world.size.x ) {

                            return false;

                        }

                        if ( neighbouringTileLocation.y < -world.size.y ) {

                            return false;

                        }

                        if ( neighbouringTileLocation.y > world.size.y ) {

                            return false;

                        }

                        if (
                            allocation[
                                generateLocationHash(
                                    {
                                        location: neighbouringTileLocation,
                                    },
                                )
                            ] === true
                        ) {

                            return false;

                        }

                    }

                }

                return true;

            };

            const allocation = takenSpots.reduce(
                (
                    allocation, location,
                ) => {

                    return {
                        ...allocation,
                        [ generateLocationHash(
                            {
                                location,
                            },
                        ) ]: true,
                    };

                },
                {
                },
            );

            const freeSpots = [];

            for ( let y = -world.size.y; y <= world.size.y; y += 1 ) {

                for ( let x = -world.size.x; x <= world.size.x; x += 1 ) {

                    const location = {
                        x,
                        y,
                    };

                    if ( isSpotValid(
                        {
                            location,
                        },
                    ) ) {

                        freeSpots.push(
                            location,
                        );

                    }

                }

            }

            freeSpots.sort(
                (
                    freeSpotLocation1, freeSpotLocation2,
                ) => {

                    return getDistanceBetweenVectors(
                        {
                            vector1: zeroVector,
                            vector2: freeSpotLocation1,
                        },
                    )
                - getDistanceBetweenVectors(
                    {
                        vector1: zeroVector,
                        vector2: freeSpotLocation2,
                    },
                );

                },
            );

            return freeSpots.length > 0
                ? freeSpots[ 0 ]
                : null;

        },
    );
