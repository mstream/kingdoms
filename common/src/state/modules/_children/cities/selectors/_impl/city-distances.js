// @flow

import {
    citiesSelector,
} from './cities';
import {
    createSelector,
} from 'reselect';
import {
    getDistanceBetweenVectors,
} from '../../../../../../vector';
import type {
    CitiesDistances, CityDistances,
} from '../types';
import type {
    CommonState, CommonStateSelector,
} from '../../../../types';
import type {
    CommonStateCities,
} from '../../reducer/types';

type Selector = CommonStateSelector< CitiesDistances, void >;

export const citiesDistancesSelector: Selector
    = createSelector<CommonState,
    void,
    CitiesDistances,
    CommonStateCities,
    >(
        citiesSelector,
        (
            cities,
        ) => {

            return Object.keys(
                cities,
            )
                .reduce(
                    (
                        citiesDistances, cityId: string,
                    ) => {

                        const distances: CityDistances = Object.keys(
                            cities,
                        )
                            .reduce(
                                (
                                    distances, otherCityId: string,
                                ) => {

                                    const distance: number
                                    = getDistanceBetweenVectors(
                                        {
                                            vector1: cities[ cityId ].location,
                                            vector2: cities[ otherCityId ].location,
                                        },
                                    );

                                    return {
                                        ...distances,
                                        [ otherCityId ]: distance,
                                    };

                                },
                                {
                                },
                            );

                        return {
                            ...citiesDistances,
                            [ cityId ]: distances,
                        };

                    },
                    {
                    },
                );

        },
    );
