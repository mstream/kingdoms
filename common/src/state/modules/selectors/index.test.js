// @flow

import {
    commonStateSelectors,
} from './index';
import {
    generateTests,
} from '../test-utils';
import {
    nextCitySpotSelectorTestScenarios,
} from './_test/next-city-spot-test-scenarios';

describe(
    `commonStateSelectors`,
    () => {

        generateTests(
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
