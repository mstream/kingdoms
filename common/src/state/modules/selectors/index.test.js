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
    `commonStateSelectors`,
    () => {

        runCommonStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },
                moduleSelectors: {
                    nextCitySpot: commonStateSelectors.nextCitySpot,
                },
                scenarios: {
                    nextCitySpot: nextCitySpotSelectorTestScenarios,
                },
            },
        );

    },
);
