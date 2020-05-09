// @flow

import {
    clientStateTilesSelectors,
} from './index';
import {
    generateSelectorTests,
} from '../../../../test-utils';
import {
    tilesSelectorTestScenarios,
} from './_test/tiles-test-scenarios';


const scenarios = {
    tiles: tilesSelectorTestScenarios,
};

describe(
    `clientStateTilesSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateTilesSelectors,
                scenarios,
            },
        );

    },
);
