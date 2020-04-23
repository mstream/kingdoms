// @flow

import {
    citiesByOwnerSelectorTestScenarios,
} from './_test/cities-by-owner-test-scenarios';
import {
    citiesDistancesSelectorTestScenarios,
} from './_test/city-distances-test-scenarios';
import {
    citiesSelectorTestScenarios,
} from './_test/cities-test-scenarios';
import {
    cityIdsByOwnerSelectorTestScenarios,
} from './_test/city-ids-by-owner-test-scenarios';
import {
    commonStateCitiesSelectors,
} from './index';
import {
    runCommonStateSelectorsTestScenarios,
} from '../../../test-utils';

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

                moduleSelectors: commonStateCitiesSelectors,
                scenarios      : {
                    cities         : citiesSelectorTestScenarios,
                    citiesByOwner  : citiesByOwnerSelectorTestScenarios,
                    citiesDistances: citiesDistancesSelectorTestScenarios,
                    cityIdsByOwner : cityIdsByOwnerSelectorTestScenarios,
                },
            },
        );

    },
);
