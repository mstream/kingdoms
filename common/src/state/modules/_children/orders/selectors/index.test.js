// @flow

import {
    commonStateOrdersSelectors,
} from './index';
import {
    generateTests,
} from '../../../test-utils';
import {
    ordersSelectorTestScenarios,
} from './_test/orders-test-scenarios';

describe(
    `commonStateOrdersSelectors`,
    () => {

        generateTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: commonStateOrdersSelectors,
                scenarios      : {
                    orders: ordersSelectorTestScenarios,
                },
            },
        );

    },
);
