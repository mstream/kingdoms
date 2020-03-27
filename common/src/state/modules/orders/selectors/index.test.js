// @flow


import { runCommonStateSelectorsTestScenarios } from '../../utils';
import { commonStateOrdersSelectors } from './index';
import { ordersSelectorTestScenarios } from './_test/orders-test-scenarios';

describe('commonStateOrdersSelectors', () => {
    runCommonStateSelectorsTestScenarios({
        // $FlowFixMe
        moduleSelectors: commonStateOrdersSelectors,
        scenarios: {
            // $FlowFixMe
            orders: ordersSelectorTestScenarios,
        },
    });
});