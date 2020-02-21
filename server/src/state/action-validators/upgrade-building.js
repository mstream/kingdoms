/**
 * @flow
 */

import type {ServerState} from '../../../../common/src/state';
import type {ServerUpgradeBuildingAction} from '../../../../common/src/actions';
import {calculateMissingResources} from '../../../../common/src/state';
import {EMPTY_OBJECT} from '../../../../common/src/util';

export const upgradeBuildingActionValidator = ({action, state}: { action: ServerUpgradeBuildingAction, state: ServerState }): $ReadOnlyArray<string> => {
    const {cityId, buildingType} = action.payload;
    const city = state.cities.find(city => city.id === cityId);
    if (city == null) {
        return [`city ${cityId} does not exist`];
    }
    const {buildings, resources} = city;
    const upgradingBuilding = buildings[buildingType];
    const requiredResources = upgradingBuilding.upgradeCostInfo;
    if (Object.keys(requiredResources).length === 0) {
        return [];
    }

    const availableResources = Object.keys(resources).reduce((availableResources, resourceType: string) => {
            return {
                ...availableResources,
                [resourceType]: resources[resourceType].quantity
            }
        },
        EMPTY_OBJECT
    );

    const missingResources = calculateMissingResources({available: availableResources, required: requiredResources});

    return Object.keys(missingResources).map(resourceType => `insufficient ${resourceType}`);
};