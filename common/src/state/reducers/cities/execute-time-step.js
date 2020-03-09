// @flow

import type { ServerExecuteTimeStepAction } from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonStateUnits,
    CommonState,
} from '../../../../../common/src/state';
import {
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
    convertChangeRateToDelta,
} from '../../../../../common/src/state';
import type { CommonstateReducerResult } from '../root';
import { failure, success } from '../root';

export const executeTimeStepCitiesReducer = ({ action, state }: { action: ServerExecuteTimeStepAction, state: CommonState }): CommonstateReducerResult<CommonStateCities> => {
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
                    resourceType: 'food',
                    rules: state.rules,
                }),
            });

            const woodChangeRate = convertChangeInfoToChangeRate({
                changeInfo: calculateResourceChangeInfo({
                    city,
                    resourceType: 'wood',
                    rules: state.rules,
                }),
            });

            const newFood = Math.max(0, city.resources.food + convertChangeRateToDelta({
                changeRate: foodChangeRate,
                timeDelta,
            }));

            const newWood = Math.max(0, city.resources.wood + convertChangeRateToDelta({
                changeRate: woodChangeRate,
                timeDelta,
            }));

            const newResourcesState = {
                food: newFood,
                wood: newWood,
            };

            const buildingTiersSum = calculateBuildingTierSum({
                buildings: city.buildings,
            });

            const peasantsChange = calculatePeasantChangeInfo({
                buildingTiersSum,
                unitsQuantity: city.units.peasant,
                food: newFood,
                foodChangeRate,
                rules: state.rules,
            });

            const newPeasants = Math.max(0, city.units.peasant + Math.floor(convertChangeRateToDelta({
                changeRate: convertChangeInfoToChangeRate({ changeInfo: peasantsChange }),
                timeDelta,
            })));

            const newUnitsState: CommonStateUnits = {
                ...city.units,
                peasant: newPeasants,
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


