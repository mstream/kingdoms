// @flow

import {
    commonStateWorldSelectors,
} from './index';
import {
    runCommonStateSelectorsTestScenarios,
} from '../../test-utils';
import {
    worldSelectorTestScenarios,
} from './_test/world-test-scenarios';

describe(
    `commonStateWorldSelectors`,
    () => {

        runCommonStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: commonStateWorldSelectors,
                scenarios      : {
                    // $FlowFixMe
                    world: worldSelectorTestScenarios,
                },
            },
        );

    },
);
