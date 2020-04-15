// @flow

import {
    commonStateSelectors,
} from './index';
import {
    nextCitySpotSelectorTestScenarios,
} from './_test/next-city-spot-test-scenarios';
import {
    runCommonStateSelectorsTestScenarios,
} from '../test-utils';

describe(
    `commonStateCitiesSelectors`,
    () => {

        runCommonStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                moduleSelectors: commonStateSelectors,
                scenarios      : {
                    // $FlowFixMe
                    nextCitySpot: nextCitySpotSelectorTestScenarios,
                },
            },
        );

    },
);
