// @flow


import { runCommonStateSelectorsTestScenarios } from '../../utils';
import { commonStateRulesSelectors } from './index';
import { unitStatsSelectorTestScenarios } from './_test/unit-stats-test-scenarios';
import { minimalCityMarginSelectorTestScenarios } from './_test/minimal-city-margin-test-scenarios';
import { rulesSelectorTestScenarios } from './_test/rules-test-scenarios';

describe('commonStateRulesSelectors', () => {
    runCommonStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: commonStateRulesSelectors,
        scenarios: {
            // $FlowFixMe
            minimalCityMargin: minimalCityMarginSelectorTestScenarios,
            // $FlowFixMe
            rules: rulesSelectorTestScenarios,
            // $FlowFixMe
            unitStats: unitStatsSelectorTestScenarios,
        },
    });
});