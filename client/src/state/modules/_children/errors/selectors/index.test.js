// @flow


import { runClientStateSelectorsTestScenarios } from '../../../../utils';
import { clientStateErrorsSelectors } from './index';
import { errorsSelectorTestScenarios } from './_test/errorsTestScenarios';
import { anyErrorsSelectorTestScenarios } from './_test/any-errors-test-scenarios';

describe('clientStateErrorsSelectors', () => {
    runClientStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: clientStateErrorsSelectors,
        scenarios: {
            // $FlowFixMe
            anyErrors: anyErrorsSelectorTestScenarios,
            // $FlowFixMe
            errors: errorsSelectorTestScenarios,
        },
    });
});