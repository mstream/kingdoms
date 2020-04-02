// @flow

import type { CommonState, CommonStateSelector } from '../../../types';
import { createSelector } from 'reselect';
import type { CommonStateCities } from '../../reducer/types';
import type { CitiesByOwner, CityIdsByOwner } from '../types';
import { citiesSelector } from './cities';
import { cityIdsByOwnerSelector } from './city-ids-by-owner';

export const citiesByOwnerSelector: CommonStateSelector<CitiesByOwner> = createSelector<
    CommonState,
    void,
    CitiesByOwner,
    CommonStateCities,
    CityIdsByOwner,
>(citiesSelector, cityIdsByOwnerSelector, (cities, cityIdsByOwner) => {
    return Object.keys(cityIdsByOwner).reduce((citiesByOwner, ownerId) => {
        return {
            ...citiesByOwner,
            [ownerId]: cityIdsByOwner[ownerId].map((cityId) => cities[cityId]),
        };
    }, Object.freeze({}));
});
