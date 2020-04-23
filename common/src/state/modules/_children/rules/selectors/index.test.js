// @flow

import {
    commonStateRulesSelectors,
} from './index';
import {
    minimalCityMarginSelectorTestScenarios,
} from './_test/minimal-city-margin-test-scenarios';
import {
    rulesSelectorTestScenarios,
} from './_test/rules-test-scenarios';
import {
    runCommonStateSelectorsTestScenarios,
} from '../../../test-utils';
import {
    unitStatsSelectorTestScenarios,
} from './_test/unit-stats-test-scenarios';

describe(
    `commonStateRulesSelectors`,
    () => {

        runCommonStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: commonStateRulesSelectors,
                scenarios      : {
                    minimalCityMargin: minimalCityMarginSelectorTestScenarios,
                    rules            : rulesSelectorTestScenarios,
                    unitStats        : unitStatsSelectorTestScenarios,
                },
            },
        );

    },
);
