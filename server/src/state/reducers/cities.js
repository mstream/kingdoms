/**
 * @flow
 */

import type {
    CommonStateCities,
    CommonStateCity,
} from '../../../../common/src/state';
import {
    calculateBuildingsUpgradeCost,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
    convertChangeRateToDelta
} from '../../../../common/src/state';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import {subtractQuantities} from '../../../../common/src/quantity';
import {convertQuantitiesToResources} from '../../../../common/src/resource';
import type {ServerStateReducer} from './root';
import {initialState} from '../state';

export const citiesReducer: ServerStateReducer<CommonStateCities> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return initialState.cities;
        }
        case 'ABANDON_CITY': {
            return state.cities.map<CommonStateCity>((city) => {
                if (city.id !== action.payload.cityId) {
                    return city;
                }
                return {
                    ...city,
                    ownerId: null,
                };
            });
        }
        case 'CHANGE_CITY_NAME': {
            return state.cities.map<CommonStateCity>((city) => {
                if (city.id !== action.payload.cityId) {
                    return city;
                }
                return {
                    ...city,
                    name: action.payload.name,
                };
            });
        }
        case 'UPGRADE_BUILDING': {
            return state.cities.map<CommonStateCity>((city) => {
                if (city.id !== action.payload.cityId) {
                    return city;
                }
                const buildingType = action.payload.buildingType;

                const availableResources = Object.keys(city.resources).reduce((availableResources, resourceType: string) => {
                        return {
                            ...availableResources,
                            [resourceType]: city.resources[resourceType]
                        };
                    },
                    EMPTY_OBJECT
                );

                const requiredResources = calculateBuildingsUpgradeCost({buildingTier: city.buildings[buildingType].tier, buildingType, rules: state.rules});

                const newResources = convertQuantitiesToResources({
                    quantities: subtractQuantities({
                        quantities1: availableResources,
                        quantities2: requiredResources
                    })
                });

                return {
                    ...city,
                    buildings: {
                        ...city.buildings,
                        [buildingType]: {
                            ...city.buildings[buildingType],
                            tier: city.buildings[buildingType].tier + 1,
                        }
                    },
                    resources: newResources
                };
            });
        }
        case 'EXECUTE_TIME_STEP': {
            const stateTime = state.time;

            const timeDelta = (Date.parse(action.payload) - Date.parse(stateTime)) / 1000;

            if (timeDelta <= 0) {
                console.error(`the time from action ${action.payload} is not past the time from the state ${stateTime}`);
                return state.cities;
            }

            const citiesState = state.cities;

            return citiesState.map<CommonStateCity>((city) => {
                    const {citizens, resources} = city;

                    const foodChangeRate = convertChangeInfoToChangeRate({
                        changeInfo: calculateResourceChangeInfo({
                            city,
                            resourceType: 'food',
                            rules: state.rules
                        })
                    });

                    const woodChangeRate = convertChangeInfoToChangeRate({
                        changeInfo: calculateResourceChangeInfo({
                            city,
                            resourceType: 'wood',
                            rules: state.rules
                        })
                    });

                    const newFood = Math.max(0, resources.food + convertChangeRateToDelta({
                        changeRate: foodChangeRate,
                        timeDelta
                    }));

                    const newWood = Math.max(0, resources.wood + convertChangeRateToDelta({
                        changeRate: woodChangeRate,
                        timeDelta
                    }));

                    const newResourcesState = {
                        food: newFood,
                        wood: newWood,
                    };

                    const buildingTiersSum = Object
                        .keys(city.buildings)
                        .map((buildingType) => {
                            return city.buildings[buildingType];
                        })
                        .reduce((buildingTiersSum, building) => {
                                return buildingTiersSum + building.tier;
                            },
                            0
                        );

                    const peasantsChange = calculatePeasantChangeInfo({
                        buildingTiersSum,
                        citizensQuantity: citizens.peasant,
                        food: newFood,
                        foodChangeRate,
                        rules: state.rules
                    });

                    const newPeasants = Math.max(0, citizens.peasant + Math.floor(convertChangeRateToDelta({
                        changeRate: convertChangeInfoToChangeRate({changeInfo: peasantsChange}),
                        timeDelta
                    })));

                    const newCitizensState = {
                        peasant: newPeasants
                    };

                    return {
                        ...city,
                        citizens: newCitizensState,
                        resources: newResourcesState,
                    };
                }
            );
        }
        default: {
            return state.cities;
        }
    }
};

