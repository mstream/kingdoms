// @flow

import { convertQuantitiesToResources } from '../../../../resource';
import { subtractQuantities } from '../../../../quantity';
import { calculateBuildingsUpgradeCost } from '../../../index';
import type { CommonStateCities, CommonStateCity } from './types';
import type {
    CommonStateResourceKey,
    CommonStateResources,
} from '../../rules/reducer/types';
import type {
    CommonState,
    CommonStateActionReducer,
    CommonStateReducerResult,
} from '../../types';
import { failure, success } from '../../utils';
import type {
    CommonAbandonCityAction,
    CommonUpgradeBuildingAction,
} from '../actions/types';

type Reducer = CommonStateActionReducer<CommonStateCities, CommonUpgradeBuildingAction>;

export const upgradeBuildingCitiesReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    }
)=> {
    const { buildingType, cityId, playerId } = action.payload;

    const city = localState[cityId];

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
        rules: globalState.rules,
    });

    const availableResources: CommonStateResources = Object
        .keys(resources)
        .reduce((availableResources, resourceType: CommonStateResourceKey) => {
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
        ...localState,
        [cityId]: newCityState,
    };

    return success({ state: newState });
};
