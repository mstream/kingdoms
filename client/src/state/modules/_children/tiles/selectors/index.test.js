// @flow

import {
    clientStateTilesSelectors,
} from './index';
import {
    tilesSelectorTestScenarios,
} from './_test/tiles-test-scenarios';
import {
    runClientStateSelectorsTestScenarios,
} from '../../../../test-utils';

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
