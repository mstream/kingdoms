// @flow

import {
    commonStateTimeSelectors,
} from './index';
import {
    runCommonStateSelectorsTestScenarios,
} from '../../../test-utils';
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

                moduleSelectors: commonStateTimeSelectors,
                scenarios      : {
                    time: timeSelectorTestScenarios,
                },
            },
        );

    },
);
