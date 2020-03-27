// @flow


import { commonStateCitiesSelectors } from './index';
import { citiesByOwnerSelectorTestScenarios } from './_test/cities-by-owner-test-scenarios';
import { cityIdsByOwnerSelectorTestScenarios } from './_test/city-ids-by-owner-test-scenarios';
import { citiesSelectorTestScenarios } from './_test/cities-test-scenarios';
import { citiesDistancesSelectorTestScenarios } from './_test/city-distances-test-scenarios';
import { runCommonStateSelectorsTestScenarios } from '../../utils';

describe('commonStateCitiesSelectors', () => {
    runCommonStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: commonStateCitiesSelectors,
        scenarios: {
            // $FlowFixMe
            cities: citiesSelectorTestScenarios,
            // $FlowFixMe
            citiesByOwner: citiesByOwnerSelectorTestScenarios,
            // $FlowFixMe
            citiesDistances: citiesDistancesSelectorTestScenarios,
            // $FlowFixMe
            cityIdsByOwner: cityIdsByOwnerSelectorTestScenarios,
        },
    });
});