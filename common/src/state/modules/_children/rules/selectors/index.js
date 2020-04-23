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
import type {
    CommonStateSelectors,
} from '../../../types';

export const commonStateRulesSelectors: CommonStateSelectors = {
    minimalCityMargin: minimalCityMarginSelector,
    rules            : rulesSelector,
    unitStats        : unitStatsSelector,
};
