// @flow

import type { ServerExecuteTimeStepAction } from '../../../../../common/src/actions';
import type { CommonStateReducerResult } from '../root';
import { failure, success } from '../root';
import type {
    CommonState,
    CommonStateCities,
    CommonStateUnits,
} from '../../index';
import {
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
    convertChangeRateToDelta,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
    UNIT_PEASANT,
} from '../../index';

export const executeTimeStepCitiesReducer = ({ action, state }: { action: ServerExecuteTimeStepAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
    const timeDelta = (Date.parse(action.payload) - Date.parse(state.time)) / 1000;

    if (timeDelta <= 0) {
        return failure({ errors: [`the time from the action is not past the time from the state`] });
    }

    const newState = Object.keys(state.cities).reduce(
        (newState, cityId) => {
            const city = state.cities[cityId];

            const foodChangeRate = convertChangeInfoToChangeRate({
                changeInfo: calculateResourceChangeInfo({
                    city,
                    resourceType: RESOURCE_FOOD,
                    rules: state.rules,
                }),
            });

            const woodChangeRate = convertChangeInfoToChangeRate({
                changeInfo: calculateResourceChangeInfo({
                    city,
                    resourceType: RESOURCE_WOOD,
                    rules: state.rules,
                }),
            });

            const newFood = Math.max(0, city.resources[RESOURCE_FOOD] + convertChangeRateToDelta({
                changeRate: foodChangeRate,
                timeDelta,
            }));

            const newWood = Math.max(0, city.resources[RESOURCE_WOOD] + convertChangeRateToDelta({
                changeRate: woodChangeRate,
                timeDelta,
            }));

            const newResourcesState = {
                [RESOURCE_FOOD]: newFood,
                [RESOURCE_WOOD]: newWood,
            };

            const buildingTiersSum = calculateBuildingTierSum({
                buildings: city.buildings,
            });

            const peasantsChange = calculatePeasantChangeInfo({
                buildingTiersSum,
                unitsQuantity: city.units[UNIT_PEASANT],
                food: newFood,
                foodChangeRate,
                rules: state.rules,
            });

            const newPeasants = Math.max(0, city.units[UNIT_PEASANT] + Math.floor(convertChangeRateToDelta({
                changeRate: convertChangeInfoToChangeRate({ changeInfo: peasantsChange }),
                timeDelta,
            })));

            const newUnitsState: CommonStateUnits = {
                ...city.units,
                [UNIT_PEASANT]: newPeasants,
            };

            const newCityState = {
                ...city,
                units: newUnitsState,
                resources: newResourcesState,
            };

            return {
                ...newState,
                [cityId]: newCityState,
            };
        },
        {},
    );

    return success({ state: newState });
};


