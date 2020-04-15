// @flow

import {
    commonStateTimeSelectors,
} from './index';
import {
    timeSelectorTestScenarios,
} from './_test/time-test-scenarios';
import {
    runCommonStateSelectorsTestScenarios,
} from '../../test-utils';

describe(
    `commonStateTimeSelectors`,
    () => {

        runCommonStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: commonStateTimeSelectors,
                scenarios      : {
                    // $FlowFixMe
                    time: timeSelectorTestScenarios,
                },
            },
        );

    },
);
