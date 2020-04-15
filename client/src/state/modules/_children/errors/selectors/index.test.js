// @flow

import {
    runClientStateSelectorsTestScenarios,
} from '../../../../utils';
import {
    clientStateErrorsSelectors,
} from './index';
import {
    errorsSelectorTestScenarios,
} from './_test/errors-test-scenarios';
import {
    anyErrorsSelectorTestScenarios,
} from './_test/any-errors-test-scenarios';

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
