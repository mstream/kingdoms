// @flow

import { runClientStateSelectorsTestScenarios } from '../../../../utils';
import { clientStateCommonStateSelectors } from './index';
import { isLoadedSelectorTestScenarios } from './_test/is-loaded-test-scenarios';
import { commonStateSelectorTestScenarios } from './_test/common-state-test-scenarios';

describe('clientStateCommonStateSelectors', () => {
    runClientStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: clientStateCommonStateSelectors,
        scenarios: {
            // $FlowFixMe
            commonState: commonStateSelectorTestScenarios,
            // $FlowFixMe
            isLoaded: isLoadedSelectorTestScenarios,
        },
    });
});
