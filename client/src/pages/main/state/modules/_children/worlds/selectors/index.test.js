// @flow

import {
    clientStateWorldsSelectors,
} from './index';
import {
    generateSelectorTests,
} from '../../../../test-utils';
import {
    worldIdsSelectorTestScenarios,
} from './_test/world-ids-test-scenarios';

const scenarios = {
    worldIds: worldIdsSelectorTestScenarios,
};

describe(
    `clientStateWorldsSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateWorldsSelectors,
                scenarios,
            },
        );

    },
);
