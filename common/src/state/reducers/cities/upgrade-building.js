// @flow

import type { ServerUpgradeBuildingAction } from '../../../../../common/src/actions';
import type { CommonStateReducerResult } from '../root';
import { failure, success } from '../root';
import { convertQuantitiesToResources } from '../../../../../common/src/resource';
import { subtractQuantities } from '../../../../../common/src/quantity';
import type {
    CommonState,
    CommonStateCities,
    CommonStateCity, ResourceType,
} from '../../index';
import { calculateBuildingsUpgradeCost } from '../../index';

export const upgradeBuildingCitiesReducer = ({ action, state }: { action: ServerUpgradeBuildingAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
    const { buildingType, cityId, playerId } = action.payload;
    const city = state.cities[cityId];

    if (city == null) {
        return failure({ errors: [`the city does not exist`] });
    }

    if (playerId !== city.ownerId) {
        return failure({ errors: [`the city does not belong to the player`] });
    }

    const { buildings, resources } = city;

    const upgradingBuilding = buildings[buildingType];
    const requiredResources = calculateBuildingsUpgradeCost({
        buildingTier: upgradingBuilding.tier,
        buildingType,
        rules: state.rules,
    });

    const availableResources = Object.keys(resources).reduce((availableResources, resourceType: ResourceType) => {
            return {
                ...availableResources,
                // $FlowFixMe
                [resourceType]: resources[resourceType],
            };
        },
        {},
    );

    const resourcesAfter = convertQuantitiesToResources({
        quantities: subtractQuantities({
            quantities1: availableResources,
            quantities2: requiredResources,
        }),
    });

    const insufficientResourcesErrorMessages = Object.keys(resourcesAfter)
        .filter(resourceType => resourcesAfter[resourceType] < 0)
        .map(resourceType => `insufficient ${resourceType}`);

    if (insufficientResourcesErrorMessages.length > 0) {
        return failure({ errors: insufficientResourcesErrorMessages });
    }

    const newResources = convertQuantitiesToResources({
        quantities: subtractQuantities({
            quantities1: availableResources,
            quantities2: requiredResources,
        }),
    });

    const newCityState: CommonStateCity = {
        ...city,
        buildings: {
            ...city.buildings,
            // $FlowFixMe
            [buildingType]: {
                ...city.buildings[buildingType],
                tier: city.buildings[buildingType].tier + 1,
            },
        },
        resources: newResources,
    };

    const newState = {
        ...state.cities,
        [cityId]: newCityState,
    };

    return success({ state: newState });
};
