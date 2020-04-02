// @flow

import type { CommonState, CommonStateSelector } from '../../../types';
import { createSelector } from 'reselect';
import type { CommonStateCities } from '../../reducer/types';
import { citiesSelector } from './cities';
import type { CityIdsByOwner } from '../types';

export const cityIdsByOwnerSelector: CommonStateSelector<CityIdsByOwner> = createSelector<
    CommonState,
    void,
    CityIdsByOwner,
    CommonStateCities,
>(citiesSelector, (cities) => {
    return Object.keys(cities).reduce((cityIdsByOwner, cityId) => {
        const city = cities[cityId];
        const playerId = city.ownerId;

        if (playerId == null) {
            return cityIdsByOwner;
        }

        const playerCityIds = cityIdsByOwner[playerId];
        const newPlayerCityIds = [
            ...(playerCityIds == null ? [] : [...playerCityIds]),
            cityId,
        ];

        return {
            ...cityIdsByOwner,
            [playerId]: newPlayerCityIds,
        };
    }, Object.freeze({}));
});
