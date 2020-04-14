// @flow

import {
    runClientStateSelectorsTestScenarios,
} from '../../../../utils';
import {
    clientStateTilesSelectors,
} from './index';
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
