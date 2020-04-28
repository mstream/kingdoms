// @flow

import {
    commonStateTimeSelectors,
} from './index';
import {
    generateTests,
} from '../../../test-utils';
import {
    timeSelectorTestScenarios,
} from './_test/time-test-scenarios';

describe(
    `commonStateTimeSelectors`,
    () => {

        generateTests(
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
