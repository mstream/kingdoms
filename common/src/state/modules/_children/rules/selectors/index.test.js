// @flow

import {
    commonStateRulesSelectors,
} from './index';
import {
    generateTests,
} from '../../../test-utils';
import {
    minimalCityMarginSelectorTestScenarios,
} from './_test/minimal-city-margin-test-scenarios';
import {
    rulesSelectorTestScenarios,
} from './_test/rules-test-scenarios';
import {
    unitStatsSelectorTestScenarios,
} from './_test/unit-stats-test-scenarios';

describe(
    `commonStateRulesSelectors`,
    () => {

        generateTests(
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
