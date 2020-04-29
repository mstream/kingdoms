// @flow

import {
    anyErrorsSelectorTestScenarios,
} from './_test/any-errors-test-scenarios';
import {
    clientStateErrorsSelectors,
} from './index';
import {
    errorsSelectorTestScenarios,
} from './_test/errors-test-scenarios';
import {
    generateSelectorTests,
} from '../../../../test-utils';

describe(
    `clientStateErrorsSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateErrorsSelectors,
                scenarios      : {
                    anyErrors: anyErrorsSelectorTestScenarios,
                    errors   : errorsSelectorTestScenarios,
                },
            },
        );

    },
);
