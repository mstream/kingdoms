// @flow

import {
    commonStateWorldSelectors,
} from './index';
import {
    worldSelectorTestScenarios,
} from './_test/world-test-scenarios';
import {
    runCommonStateSelectorsTestScenarios,
} from '../../test-utils';

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
