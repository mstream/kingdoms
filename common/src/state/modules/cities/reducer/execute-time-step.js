// @flow

import {
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
    convertChangeRateToDelta,



} from '../../../index';
import type { CommonStateCities } from './types';
import { calculateTimeDelta } from '../../../../util';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
    UNIT_PEASANT,
} from '../../rules/reducer/types';
import type { CommonStateUnits } from '../../rules/reducer/types';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { failure, success } from '../../utils';
import type { CommonExecuteTimeStepAction } from '../../time/actions';

export const executeTimeStepCitiesReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonExecuteTimeStepAction,
        globalState: CommonState,
        localState: CommonStateCities,
    },
): CommonStateReducerResult<CommonStateCities> => {

    const timeDelta = calculateTimeDelta({
        fromTime: globalState.time,
        toTime: action.payload.time,
    });

    if (timeDelta < 0) {
        return failure({ errors: [`the time from the action is not past the time from the state`] });
    }

    const newState = Object.keys(localState).reduce(
        (newState, cityId: string) => {
            const city = localState[cityId];

            const foodChangeRate = convertChangeInfoToChangeRate({
                changeInfo: calculateResourceChangeInfo({
                    city,
                    resourceType: RESOURCE_FOOD,
                    rules: globalState.rules,
                }),
            });

            const woodChangeRate = convertChangeInfoToChangeRate({
                changeInfo: calculateResourceChangeInfo({
                    city,
                    resourceType: RESOURCE_WOOD,
                    rules: globalState.rules,
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
                rules: globalState.rules,
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

