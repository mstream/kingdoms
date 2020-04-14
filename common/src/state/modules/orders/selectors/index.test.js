// @flow

import {
    runCommonStateSelectorsTestScenarios,
} from '../../utils';
import {
    commonStateOrdersSelectors,
} from './index';
import {
    ordersSelectorTestScenarios,
} from './_test/orders-test-scenarios';

describe(
    `commonStateOrdersSelectors`,
    () => {

        runCommonStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: commonStateOrdersSelectors,
                scenarios      : {
                    // $FlowFixMe
                    orders: ordersSelectorTestScenarios,
                },
            },
        );

    },
);
