// @flow

import {
    clientStateCommonStateSelectors,
} from './index';
import {
    commonStateSelectorTestScenarios,
} from './_test/common-state-test-scenarios';
import {
    isLoadedSelectorTestScenarios,
} from './_test/is-loaded-test-scenarios';
import {
    runClientStateSelectorsTestScenarios,
} from '../../../../test-utils';

describe(
    `clientStateCommonStateSelectors`,
    () => {

        runClientStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: clientStateCommonStateSelectors,
                scenarios      : {
                    // $FlowFixMe
                    commonState: commonStateSelectorTestScenarios,

                    // $FlowFixMe
                    isLoaded: isLoadedSelectorTestScenarios,
                },
            },
        );

    },
);
