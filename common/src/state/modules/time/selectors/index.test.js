// @flow


import { runCommonStateSelectorsTestScenarios } from '../../utils';
import { commonStateTimeSelectors } from './index';
import { timeSelectorTestScenarios } from './_test/time-test-scenarios';

describe('commonStateTimeSelectors', () => {
    runCommonStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: commonStateTimeSelectors,
        scenarios: {
            // $FlowFixMe
            time: timeSelectorTestScenarios,
        },
    });
});