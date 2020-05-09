// @flow

import {
    citiesDistancesSelector,
} from './_impl/cities-distances';
import {
    citiesSelector,
} from './_impl/cities';
import {
    cityIdsByOwnerSelector,
} from './_impl/city-ids-by-owner';
import {
    commonStateSelector,
} from './_impl/common-state';
import {
    isLoadedSelector,
} from './_impl/is-loaded';
import {
    ordersSelector,
} from './_impl/orders';
import {
    rulesSelector,
} from './_impl/rules';
import {
    timeSelector,
} from './_impl/time';
import {
    unitStatsSelector,
} from './_impl/unit-stats';
import {
    worldSelector,
} from './_impl/world';

export const clientStateCommonStateSelectors = {
    cities         : citiesSelector,
    citiesDistances: citiesDistancesSelector,
    cityIdsByOwner : cityIdsByOwnerSelector,
    commonState    : commonStateSelector,
    isLoaded       : isLoadedSelector,
    orders         : ordersSelector,
    rules          : rulesSelector,
    time           : timeSelector,
    unitStats      : unitStatsSelector,
    world          : worldSelector,
};
