// @flow

import {
    clientStateCommonStateSelectors,
} from './index';
import {
    commonStateSelectorTestScenarios,
} from './_test/common-state-test-scenarios';
import {
    generateSelectorTests,
} from '../../../../test-utils';
import {
    isLoadedSelectorTestScenarios,
} from './_test/is-loaded-test-scenarios';

describe(
    `clientStateCommonStateSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateCommonStateSelectors,
                scenarios      : {
                    commonState: commonStateSelectorTestScenarios,
                    isLoaded   : isLoadedSelectorTestScenarios,
                },
            },
        );

    },
);
