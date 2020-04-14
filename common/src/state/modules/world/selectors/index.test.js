// @flow

import {
    runCommonStateSelectorsTestScenarios,
} from '../../utils';
import {
    commonStateWorldSelectors,
} from './index';
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
