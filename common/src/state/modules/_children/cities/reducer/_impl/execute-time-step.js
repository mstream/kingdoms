// @flow

import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
    UNIT_PEASANT,
} from '../../../rules/reducer/types';
import {
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
    convertChangeRateToDelta,
} from '../../../../../index';
import {
    commonStateSelectors,
} from '../../../../selectors';
import {
    failure, success,
} from '../../../../utils';
import type {
    CommonExecuteTimeStepAction,
} from '../../../time/actions';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateCities,
} from '../types';
import type {
    CommonStateUnits,
} from '../../../rules/reducer/types';

type Reducer = CommonStateActionReducer< CommonStateCities,
    CommonExecuteTimeStepAction, >;

export const executeTimeStepCitiesReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {

    const realTimeDeltaInSeconds = commonStateSelectors.time.timeDeltaInSeconds(
        globalState,
        {
            time: action.payload.time,
        },
    );

    if ( realTimeDeltaInSeconds < 0 ) {

        return failure(
            {
                errors: [
                    `the time from the action is not past the time from the state`,
                ],
            },
        );

    }

    const rules = commonStateSelectors.rules.rules(
        globalState,
    );

    const gameTimeDeltaInSeconds = realTimeDeltaInSeconds * rules.gameSpeed;

    const newState = Object.keys(
        localState,
    )
        .reduce(
            (
                newState, cityId: string,
            ) => {

                const city = localState[ cityId ];

                const foodChangeRate = convertChangeInfoToChangeRate(
                    {
                        changeInfo: calculateResourceChangeInfo(
                            {
                                city,
                                resourceType: RESOURCE_FOOD,
                                rules,
                            },
                        ),
                    },
                );

                const woodChangeRate = convertChangeInfoToChangeRate(
                    {
                        changeInfo: calculateResourceChangeInfo(
                            {
                                city,
                                resourceType: RESOURCE_WOOD,
                                rules,
                            },
                        ),
                    },
                );

                const newFood = Math.max(
                    0,
                    city.resources[ RESOURCE_FOOD ]
                    + convertChangeRateToDelta(
                        {
                            changeRate: foodChangeRate,
                            timeDelta : gameTimeDeltaInSeconds,
                        },
                    ),
                );

                const newWood = Math.max(
                    0,
                    city.resources[ RESOURCE_WOOD ]
                    + convertChangeRateToDelta(
                        {
                            changeRate: woodChangeRate,
                            timeDelta : gameTimeDeltaInSeconds,
                        },
                    ),
                );

                const newResourcesState = {
                    [ RESOURCE_FOOD ]: newFood,
                    [ RESOURCE_WOOD ]: newWood,
                };

                const buildingTiersSum = calculateBuildingTierSum(
                    {
                        buildings: city.buildings,
                    },
                );

                const peasantsChange = calculatePeasantChangeInfo(
                    {
                        buildingTiersSum,
                        food         : newFood,
                        foodChangeRate,
                        rules,
                        unitsQuantity: city.units[ UNIT_PEASANT ],
                    },
                );

                const newPeasants = Math.max(
                    0,
                    city.units[ UNIT_PEASANT ]
                    + Math.floor(
                        convertChangeRateToDelta(
                            {
                                changeRate: convertChangeInfoToChangeRate(
                                    {
                                        changeInfo: peasantsChange,
                                    },
                                ),
                                timeDelta: gameTimeDeltaInSeconds,
                            },
                        ),
                    ),
                );

                const newUnitsState: CommonStateUnits = {
                    ...city.units,
                    [ UNIT_PEASANT ]: newPeasants,
                };

                const newCityState = {
                    ...city,
                    resources: newResourcesState,
                    units    : newUnitsState,
                };

                return {
                    ...newState,
                    [ cityId ]: newCityState,
                };

            },
            {
            },
        );

    return success(
        {
            state: newState,
        },
    );

};
