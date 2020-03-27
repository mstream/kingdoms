// @flow

import { createSelector } from 'reselect';
import type { CitiesDistances, CityDistances } from '../types';
import type { CommonState, CommonStateSelector } from '../../../types';
import type { CommonStateCities } from '../../reducer/types';
import { getDistanceBetweenVectors } from '../../../../../vector';
import { citiesSelector } from './cities';


export const citiesDistancesSelector: CommonStateSelector<CitiesDistances> =
    createSelector<CommonState, void, CitiesDistances, CommonStateCities>(
        citiesSelector,
        (cities) => {
            return Object.keys(cities).reduce(
                (citiesDistances, cityId: string) => {

                    const distances: CityDistances = Object.keys(cities).reduce(
                        (distances, otherCityId: string) => {

                            const distance: number = getDistanceBetweenVectors({
                                vector1: cities[cityId].location,
                                vector2: cities[otherCityId].location,
                            });

                            return {
                                ...distances,
                                // $FlowFixMe
                                [otherCityId]: distance,
                            };
                        },
                        {},
                    );

                    return {
                        ...citiesDistances,
                        [cityId]: distances,
                    };
                },
                {},
            );
        },
    );