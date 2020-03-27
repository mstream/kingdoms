// @flow


import { runCommonStateSelectorsTestScenarios } from '../utils';
import { commonStateCitiesSelectors } from '../cities/selectors';
import { nextCitySpotSelectorTestScenarios } from './_test/next-city-spot-test-scenarios';
import { commonStateSelectors } from './index';

describe('commonStateCitiesSelectors', () => {
    runCommonStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: commonStateSelectors,
        scenarios: {
            // $FlowFixMe
            nextCitySpot: nextCitySpotSelectorTestScenarios,
        },
    });
});