// @flow

import {
    unitStatsSelector,
} from './_impl/unit-stats';
import {
    minimalCityMarginSelector,
} from './_impl/minimal-city-margin';
import {
    rulesSelector,
} from './_impl/rules';

export const commonStateRulesSelectors = {
    minimalCityMargin: minimalCityMarginSelector,
    rules            : rulesSelector,
    unitStats        : unitStatsSelector,
};
