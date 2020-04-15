// @flow

import {
    minimalCityMarginSelector,
} from './_impl/minimal-city-margin';
import {
    rulesSelector,
} from './_impl/rules';
import {
    unitStatsSelector,
} from './_impl/unit-stats';

export const commonStateRulesSelectors = {
    minimalCityMargin: minimalCityMarginSelector,
    rules            : rulesSelector,
    unitStats        : unitStatsSelector,
};
