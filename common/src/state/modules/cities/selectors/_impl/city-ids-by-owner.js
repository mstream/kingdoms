// @flow

import {
    citiesSelector,
} from './cities';
import {
    createSelector,
} from 'reselect';
import type {
    CityIdsByOwner,
} from '../types';
import type {
    CommonState, CommonStateSelector,
} from '../../../types';
import type {
    CommonStateCities,
} from '../../reducer/types';

export const cityIdsByOwnerSelector: CommonStateSelector< CityIdsByOwner > = createSelector<CommonState,
    void,
    CityIdsByOwner,
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
                        cityIdsByOwner, cityId,
                    ) => {

                        const city = cities[ cityId ];
                        const playerId = city.ownerId;

                        if ( playerId == null ) {

                            return cityIdsByOwner;

                        }

                        const playerCityIds = cityIdsByOwner[ playerId ];

                        const newPlayerCityIds = [
                            ...( playerCityIds == null
                                ? []
                                : [
                                    ...playerCityIds,
                                ] ),
                            cityId,
                        ];

                        return {
                            ...cityIdsByOwner,
                            [ playerId ]: newPlayerCityIds,
                        };

                    },
                    Object.freeze(
                        {
                        },
                    ),
                );

        },
    );
