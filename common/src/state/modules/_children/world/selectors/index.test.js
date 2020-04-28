// @flow

import {
    commonStateWorldSelectors,
} from './index';
import {
    generateTests,
} from '../../../test-utils';
import {
    worldSelectorTestScenarios,
} from './_test/world-test-scenarios';

describe(
    `commonStateWorldSelectors`,
    () => {

        generateTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: commonStateWorldSelectors,
                scenarios      : {
                    world: worldSelectorTestScenarios,
                },
            },
        );

    },
);
