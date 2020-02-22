/**
 * @flow
 */

import type {ServerState} from '../../../../common/src/state';
import type {ServerUpgradeBuildingAction} from '../../../../common/src/actions';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import {subtractQuantities} from '../../../../common/src/quantity';
import {convertQuantitiesToResources} from '../../../../common/src/resource';
import {calculateBuildingsUpgradeCost} from '../../../../common/src/state';

export const validateUpgradeBuildingAction = ({action, state}: { action: ServerUpgradeBuildingAction, state: ServerState }): $ReadOnlyArray<string> => {
    const {cityId, buildingType} = action.payload;
    const city = state.cities.find(city => city.id === cityId);
    if (city == null) {
        return [`city ${cityId} does not exist`];
    }
    const {buildings, resources} = city;
    const upgradingBuilding = buildings[buildingType];
    const requiredResources = calculateBuildingsUpgradeCost({buildingTier: upgradingBuilding.tier,buildingType, rules: state.rules});

    const availableResources = Object.keys(resources).reduce((availableResources, resourceType: string) => {
            return {
                ...availableResources,
                [resourceType]: resources[resourceType]
            };
        },
        EMPTY_OBJECT
    );

    const resourcesAfter = convertQuantitiesToResources({
        quantities: subtractQuantities({
            quantities1: availableResources,
            quantities2: requiredResources,
        })
    });

    return Object.keys(resourcesAfter)
        .filter(resourceType => resourcesAfter[resourceType] < 0)
        .map(resourceType => `insufficient ${resourceType}`);
};