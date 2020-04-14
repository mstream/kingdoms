// @flow

import {
    runCommonStateSelectorsTestScenarios,
} from '../utils';
import {
    nextCitySpotSelectorTestScenarios,
} from './_test/next-city-spot-test-scenarios';
import {
    commonStateSelectors,
} from './index';

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
