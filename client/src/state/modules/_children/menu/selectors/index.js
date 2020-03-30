// @flow


import { isNewCityBeingCreatedSelector } from './_impl/is-new-city-being-created';
import { regimentTemplateSelector } from './_impl/regiment-template';
import { attackedCityIdSelector } from './_impl/attacked-city-id';
import { attackingCityIdSelector } from './_impl/attacking-city-id';
import { currentlyViewedCityIdSelector } from './_impl/currently-viewed-city-id';
import { minimumAttackDelaySelector } from './_impl/minimum-attack-delay';
import { isAttackViewMenuOpenSelector } from './_impl/is-attack-view-menu-open';
import { isCityViewMenuOpenSelector } from './_impl/is-city-view-menu-open';
import { isAnyMenuOpenSelector } from './_impl/is-any-menu-open';
import { activeCityViewTabSelector } from './_impl/active-city-view-tab';
import { activeCityViewBuildingSelector } from './_impl/active-city-view-building';
import { activeCityViewResourceSelector } from './_impl/active-city-view-resource';
import { activeCityViewUnitSelector } from './_impl/active-city-view-unit';
import { isAttackFormValidSelector } from './_impl/is-attack-form-valid';
import { isAttackFormSubmittingSelector } from './_impl/is-attack-form-submitting';
import { activeCityViewOrderIdSelector } from './_impl/active-city-view-order-id';

export const clientStateMenuSelectors = {
    activeCityViewBuilding: activeCityViewBuildingSelector,
    activeCityViewOrderId: activeCityViewOrderIdSelector,
    activeCityViewResource: activeCityViewResourceSelector,
    activeCityViewUnit: activeCityViewUnitSelector,
    activeCityViewTab: activeCityViewTabSelector,
    attackedCityId: attackedCityIdSelector,
    attackingCityId: attackingCityIdSelector,
    currentlyViewedCityId: currentlyViewedCityIdSelector,
    isAnyMenuOpen: isAnyMenuOpenSelector,
    isAttackFormSubmitting: isAttackFormSubmittingSelector,
    isAttackFormValid: isAttackFormValidSelector,
    isAttackViewMenuOpen: isAttackViewMenuOpenSelector,
    isCityViewMenuOpen: isCityViewMenuOpenSelector,
    isNewCityBeingCreated: isNewCityBeingCreatedSelector,
    minimumAttackDelay: minimumAttackDelaySelector,
    regimentTemplate: regimentTemplateSelector,
};
