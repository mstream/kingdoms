// @flow

import { cityIdsByOwnerSelector } from './_impl/city-ids-by-owner';
import { citiesSelector } from './_impl/cities';
import { citiesByOwnerSelector } from './_impl/cities-by-owner';
import { citiesDistancesSelector } from './_impl/city-distances';

export const commonStateCitiesSelectors = {
    cities: citiesSelector,
    citiesByOwner: citiesByOwnerSelector,
    citiesDistances: citiesDistancesSelector,
    cityIdsByOwner: cityIdsByOwnerSelector,
};
