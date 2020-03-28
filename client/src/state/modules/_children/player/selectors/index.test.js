// @flow


import { runClientStateSelectorsTestScenarios } from '../../../../utils';
import { clientStatePlayerSelectors } from './index';
import { nameSelectorTestScenarios } from './_test/name-test-scenarios';
import { isAuthenticatedSelectorTestScenarios } from './_test/is-authenticated-test-scenarios';

describe('clientStatePlayerSelectors', () => {
    runClientStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: clientStatePlayerSelectors,
        scenarios: {
            // $FlowFixMe
            isAuthenticated: isAuthenticatedSelectorTestScenarios,
            // $FlowFixMe
            name: nameSelectorTestScenarios,
        },
    });
});