// @flow

import {
    clientStatePlayerSelectors,
} from './index';
import {
    generateSelectorTests,
} from '../../../../test-utils';
import {
    isAuthenticatedSelectorTestScenarios,
} from './_test/is-authenticated-test-scenarios';
import {
    nameSelectorTestScenarios,
} from './_test/name-test-scenarios';

const scenarios = {
    isAuthenticated: isAuthenticatedSelectorTestScenarios,
    name           : nameSelectorTestScenarios,
};

describe(
    `clientStatePlayerSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStatePlayerSelectors,
                scenarios,
            },
        );

    },
);
