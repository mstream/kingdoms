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
    runClientStateSelectorsTestScenarios,
} from '../../../../test-utils';

describe(
    `clientStateErrorsSelectors`,
    () => {

        runClientStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: clientStateErrorsSelectors,
                scenarios      : {
                    // $FlowFixMe
                    anyErrors: anyErrorsSelectorTestScenarios,

                    // $FlowFixMe
                    errors: errorsSelectorTestScenarios,
                },
            },
        );

    },
);
