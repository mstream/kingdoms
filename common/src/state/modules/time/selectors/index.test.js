// @flow

import {
    runCommonStateSelectorsTestScenarios,
} from '../../utils';
import {
    commonStateTimeSelectors,
} from './index';
import {
    timeSelectorTestScenarios,
} from './_test/time-test-scenarios';

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
