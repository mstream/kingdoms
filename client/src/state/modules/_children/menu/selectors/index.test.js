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
import {
    runClientStateSelectorsTestScenarios,
} from '../../../../test-utils';

describe(
    `clientStateMenuSelectors`,
    () => {

        runClientStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateMenuSelectors,
                scenarios      : {
                    // $FlowFixMe
                    activeCityViewBuilding: activeCityViewBuildingSelectorTestScenarios,

                    // $FlowFixMe
                    activeCityViewOrderId: activeCityViewOrderIdSelectorTestScenarios,

                    // $FlowFixMe
                    activeCityViewResource: activeCityViewResourceSelectorTestScenarios,

                    // $FlowFixMe
                    activeCityViewTab: activeCityViewTabSelectorTestScenarios,

                    // $FlowFixMe
                    activeCityViewUnit: activeCityViewUnitSelectorTestScenarios,

                    // $FlowFixMe
                    attackedCityId: attackedCityIdSelectorTestScenarios,

                    // $FlowFixMe
                    attackingCityId: attackingCityIdSelectorTestScenarios,

                    // $FlowFixMe
                    currentlyViewedCityId: currentlyViewedCityIdSelectorTestScenarios,

                    // $FlowFixMe
                    isAnyMenuOpen: isAnyMenuOpenSelectorTestScenarios,

                    // $FlowFixMe
                    isAttackFormSubmitting: isAttackFormSubmittingSelectorTestScenarios,

                    // $FlowFixMe
                    isAttackFormValid: isAttackFormValidSelectorTestScenarios,

                    // $FlowFixMe
                    isAttackViewMenuOpen: isAttackViewMenuOpenSelectorTestScenarios,

                    // $FlowFixMe
                    isCityViewMenuOpen: isCityViewMenuOpenSelectorTestScenarios,

                    // $FlowFixMe
                    isNewCityBeingCreated: isNewCityBeingCreatedSelectorTestScenarios,

                    // $FlowFixMe
                    minimumAttackDelay: minimumAttackDelaySelectorTestScenarios,

                    // $FlowFixMe
                    regimentTemplate: regimentTemplateSelectorTestScenarios,
                },
            },
        );

    },
);
