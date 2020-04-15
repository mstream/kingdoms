// @flow

import {
    clientStateTilesSelectors,
} from './index';
import {
    runClientStateSelectorsTestScenarios,
} from '../../../../test-utils';
import {
    tilesSelectorTestScenarios,
} from './_test/tiles-test-scenarios';

describe(
    `clientStateTilesSelectors`,
    () => {

        runClientStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                // $FlowFixMe
                moduleSelectors: clientStateTilesSelectors,
                scenarios      : {
                    // $FlowFixMe
                    tiles: tilesSelectorTestScenarios,
                },
            },
        );

    },
);
