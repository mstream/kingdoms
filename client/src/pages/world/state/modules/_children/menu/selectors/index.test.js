// @flow

import {
    activeCityViewBuildingSelectorTestScenarios,
} from './_test/active-city-view-building-test-scenarios';
import {
    activeCityViewOrderIdSelectorTestScenarios,
} from './_test/active-city-view-order-id-test-scenarios';
import {
    activeCityViewResourceSelectorTestScenarios,
} from './_test/active-city-view-resource-test-scenarios';
import {
    activeCityViewTabSelectorTestScenarios,
} from './_test/active-city-view-tab-test-scenarios';
import {
    activeCityViewUnitSelectorTestScenarios,
} from './_test/active-city-view-unit-test-scenarios';
import {
    attackedCityIdSelectorTestScenarios,
} from './_test/attacked-city-id-test-scenarios';
import {
    attackingCityIdSelectorTestScenarios,
} from './_test/attacking-city-id-test-scenarios';
import {
    clientStateMenuSelectors,
} from './index';
import {
    currentlyViewedCityIdSelectorTestScenarios,
} from './_test/currently-viewed-city-id-test-scenarios';
import {
    generateSelectorTests,
} from '../../../../test-utils';
import {
    isAnyMenuOpenSelectorTestScenarios,
} from './_test/is-any-menu-open-test-scenarios';
import {
    isAttackFormSubmittingSelectorTestScenarios,
} from './_test/is-attack-form-submitting-test-scenarios';
import {
    isAttackFormValidSelectorTestScenarios,
} from './_test/is-attack-form-valid-test-scenarios';
import {
    isAttackViewMenuOpenSelectorTestScenarios,
} from './_test/is-attack-view-menu-open-test-scenarios';
import {
    isCityViewMenuOpenSelectorTestScenarios,
} from './_test/is-city-view-menu-open-test-scenarios';
import {
    isNewCityBeingCreatedSelectorTestScenarios,
} from './_test/is-new-city-being-created-test-scenarios';
import {
    minimumAttackDelaySelectorTestScenarios,
} from './_test/minimum-attack-delay-test-scenarios';
import {
    regimentTemplateSelectorTestScenarios,
} from './_test/regiment-template-test-scenarios';
import type {
    ScenariosBySelector,
} from '../../../../types';

const scenarios: ScenariosBySelector = {
    activeCityViewBuilding: activeCityViewBuildingSelectorTestScenarios,
    activeCityViewOrderId : activeCityViewOrderIdSelectorTestScenarios,
    activeCityViewResource: activeCityViewResourceSelectorTestScenarios,
    activeCityViewTab     : activeCityViewTabSelectorTestScenarios,
    activeCityViewUnit    : activeCityViewUnitSelectorTestScenarios,
    attackedCityId        : attackedCityIdSelectorTestScenarios,
    attackingCityId       : attackingCityIdSelectorTestScenarios,
    currentlyViewedCityId : currentlyViewedCityIdSelectorTestScenarios,
    isAnyMenuOpen         : isAnyMenuOpenSelectorTestScenarios,
    isAttackFormSubmitting: isAttackFormSubmittingSelectorTestScenarios,
    isAttackFormValid     : isAttackFormValidSelectorTestScenarios,
    isAttackViewMenuOpen  : isAttackViewMenuOpenSelectorTestScenarios,
    isCityViewMenuOpen    : isCityViewMenuOpenSelectorTestScenarios,
    isNewCityBeingCreated : isNewCityBeingCreatedSelectorTestScenarios,
    minimumAttackDelay    : minimumAttackDelaySelectorTestScenarios,
    regimentTemplate      : regimentTemplateSelectorTestScenarios,
};

describe(
    `clientStateMenuSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateMenuSelectors,
                scenarios,
            },
        );

    },
);
