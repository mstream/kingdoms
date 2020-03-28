// @flow

import { isLoadedSelector } from './_impl/is-loaded';
import { cityIdsByOwnerSelector } from './_impl/city-ids-by-owner';
import { commonStateSelector } from './_impl/common-state';
import { citiesSelector } from './_impl/cities';
import { citiesDistancesSelector } from './_impl/cities-distances';
import { ordersSelector } from './_impl/orders';
import { rulesSelector } from './_impl/rules';
import { worldSelector } from './_impl/world';
import { unitStatsSelector } from './_impl/unit-stats';

export const clientStateCommonStateSelectors = {
    cities: citiesSelector,
    citiesDistances: citiesDistancesSelector,
    cityIdsByOwner: cityIdsByOwnerSelector,
    commonState: commonStateSelector,
    isLoaded: isLoadedSelector,
    orders: ordersSelector,
    rules: rulesSelector,
    unitStats: unitStatsSelector,
    world: worldSelector,
};
