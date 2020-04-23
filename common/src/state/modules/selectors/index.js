// @flow

import {
    commonStateCitiesSelectors,
} from '../_children/cities/selectors';
import {
    commonStateOrdersSelectors,
} from '../_children/orders/selectors';
import {
    commonStateRulesSelectors,
} from '../_children/rules/selectors';
import {
    commonStateTimeSelectors,
} from '../_children/time/selectors';
import {
    commonStateWorldSelectors,
} from '../_children/world/selectors';
import {
    nextCitySpotSelector,
} from './_impl/next-city-spot';

export const commonStateSelectors = {
    cities      : commonStateCitiesSelectors,
    nextCitySpot: nextCitySpotSelector,
    orders      : commonStateOrdersSelectors,
    rules       : commonStateRulesSelectors,
    time        : commonStateTimeSelectors,
    world       : commonStateWorldSelectors,
};
