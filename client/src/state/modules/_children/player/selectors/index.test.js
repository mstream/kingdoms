// @flow

import {
    clientStatePlayerSelectors,
} from './index';
import {
    isAuthenticatedSelectorTestScenarios,
} from './_test/is-authenticated-test-scenarios';
import {
    nameSelectorTestScenarios,
} from './_test/name-test-scenarios';
import {
    runClientStateSelectorsTestScenarios,
} from '../../../../test-utils';

describe(
    `clientStatePlayerSelectors`,
    () => {

        runClientStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStatePlayerSelectors,
                scenarios      : {
                    // $FlowFixMe
                    isAuthenticated: isAuthenticatedSelectorTestScenarios,

                    // $FlowFixMe
                    name: nameSelectorTestScenarios,
                },
            },
        );

    },
);
