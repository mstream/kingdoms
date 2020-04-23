// @flow

import {
    citiesSelector,
} from './cities';
import {
    cityIdsByOwnerSelector,
} from './city-ids-by-owner';
import {
    createSelector,
} from 'reselect';
import type {
    CitiesByOwner, CityIdsByOwner,
} from '../types';
import type {
    CommonState, CommonStateSelector,
} from '../../../../types';
import type {
    CommonStateCities,
} from '../../reducer/types';

export const citiesByOwnerSelector: CommonStateSelector< CitiesByOwner, void > = createSelector<CommonState,
    void,
    CitiesByOwner,
    CommonStateCities,
    CityIdsByOwner,
    >(
        citiesSelector,
        cityIdsByOwnerSelector,
        (
            cities, cityIdsByOwner,
        ) => {

            return Object.keys(
                cityIdsByOwner,
            )
                .reduce(
                    (
                        citiesByOwner, ownerId,
                    ) => {

                        return {
                            ...citiesByOwner,
                            [ ownerId ]: cityIdsByOwner[ ownerId ].map(
                                (
                                    cityId,
                                ) => {

                                    return cities[ cityId ];

                                },
                            ),
                        };

                    },
                    Object.freeze(
                        {
                        },
                    ),
                );

        },
    );
