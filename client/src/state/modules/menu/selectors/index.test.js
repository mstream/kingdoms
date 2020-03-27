// @flow


import { runClientStateSelectorsTestScenarios } from '../../utils';
import { attackingCityIdSelectorTestScenarios } from './_test/attacking-city-id-test-scenarios';
import { clientStateMenuSelectors } from './index';
import { attackedCityIdSelectorTestScenarios } from './_test/attacked-city-id-test-scenarios';
import { currentlyViewedCityIdSelectorTestScenarios } from './_test/currently-viewed-city-id-test-scenarios';
import { isNewCityBeingCreatedSelectorTestScenarios } from './_test/is-new-city-being-created-test-scenarios';
import { regimentTemplateSelectorTestScenarios } from './_test/regiment-template-test-scenarios';
import { minimumAttackDelaySelectorTestScenarios } from './_test/minimum-attack-delay-test-scenarios';
import { isCityViewMenuOpenSelectorTestScenarios } from './_test/is-city-view-menu-open-test-scenarios';
import { isAttackViewMenuOpenSelectorTestScenarios } from './_test/is-attack-view-menu-open-test-scenarios';
import { isAnyMenuOpenSelectorTestScenarios } from './_test/is-any-menu-open-test-scenarios';
import { activeCityViewTabSelectorTestScenarios } from './_test/active-city-view-tab-test-scenarios';
import { activeCityViewBuildingSelectorTestScenarios } from './_test/active-city-view-building-test-scenarios';
import { activeCityViewResourceSelectorTestScenarios } from './_test/active-city-view-resource-test-scenarios';
import { activeCityViewUnitSelectorTestScenarios } from './_test/active-city-view-unit-test-scenarios';
import { isAttackFormValidSelectorTestScenarios } from './_test/is-attack-form-valid-test-scenarios';

describe('clientStateMenuSelectors', () => {
        runClientStateSelectorsTestScenarios({
            // $FlowFixMe
            moduleSelectors: clientStateMenuSelectors,
            scenarios: {
                // $FlowFixMe
                activeCityViewBuilding: activeCityViewBuildingSelectorTestScenarios,
                // $FlowFixMe
                activeCityViewResource: activeCityViewResourceSelectorTestScenarios,
                // $FlowFixMe
                activeCityViewUnit: activeCityViewUnitSelectorTestScenarios,
                // $FlowFixMe
                activeCityViewTab: activeCityViewTabSelectorTestScenarios,
                // $FlowFixMe
                attackedCityId: attackedCityIdSelectorTestScenarios,
                // $FlowFixMe
                attackingCityId: attackingCityIdSelectorTestScenarios,
                // $FlowFixMe
                currentlyViewedCityId: currentlyViewedCityIdSelectorTestScenarios,
                // $FlowFixMe
                isAnyMenuOpen: isAnyMenuOpenSelectorTestScenarios,
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
        });
    },
);