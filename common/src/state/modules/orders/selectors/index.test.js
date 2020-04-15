// @flow

import {
    commonStateOrdersSelectors,
} from './index';
import {
    ordersSelectorTestScenarios,
} from './_test/orders-test-scenarios';
import {
    runCommonStateSelectorsTestScenarios,
} from '../../test-utils';

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
