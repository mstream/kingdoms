/**
 * @flow
 */

import type {Reducer} from 'redux';
import type {
    ChangeInfo,
    ServerState,
    ServerStateCity,
    ServerStateRules,
    UpgradeCost
} from '../../../../common/src/state';
import {initialState} from './state';
import type {ServerAction} from '../../../../common/src/actions';

const convertChangeInfoToChangeRate = ({changeInfo}: { changeInfo: ChangeInfo }): number => {
    return Object
        .keys(changeInfo)
        .map(changeType => changeInfo[changeType])
        .reduce(
            (changeRate, partialChangeRate) => {
                return changeRate + partialChangeRate;
            },
            0
        );
};

const convertChangeRateToDelta = ({changeRate, timeDelta}: { changeRate: number, timeDelta: number }): number => {
    return (changeRate / 3600) * timeDelta;
};

const createFoodChangeInfo = ({citizensQuantity, pastureTier, rules}: { citizensQuantity: number, pastureTier: number, rules: ServerStateRules }): ChangeInfo => {
    return {
        'pasture production': rules.resourceIncreaseChangeRateCoefficient * pastureTier,
        'citizens maintenance': -citizensQuantity * rules.unitFoodDemand
    };
};

const createWoodChangeInfo = ({lumberMillTier, rules}: { lumberMillTier: number, rules: ServerStateRules }): ChangeInfo => {
    return {
        'lumber mill production': rules.resourceIncreaseChangeRateCoefficient * lumberMillTier,
    };
};

const createPeasantChangeInfo = ({buildingTiersSum, citizensQuantity, food, foodChangeRate, rules}: { buildingTiersSum: number, citizensQuantity: number, food: number, foodChangeRate: number, rules: ServerStateRules }) => {
    const starvingPeopleQuantity = food > 0 || foodChangeRate > 0 ? 0 : Math.abs(foodChangeRate * rules.unitFoodDemand);
    const cityCapacity = rules.baseCityCapacity + Math.max(0, rules.baseCityCapacity * buildingTiersSum - starvingPeopleQuantity * rules.unitStarvingCoefficient);
    const growthFactorChange = rules.populationGrowthChangeRateCoefficient * citizensQuantity * (1 - (citizensQuantity / cityCapacity));
    return {
        'growth rate': growthFactorChange
    };
};

const calculateBuildingUpgradeCost = ({buildingType, rules, tier}: { buildingType: string, rules: ServerStateRules, tier: number }): UpgradeCost => {
    const baseUpgradeCost = rules.buildingUpgradeCosts[buildingType];
    const factor = 1 + tier * rules.buildingUpgradeCoefficient;
    return {
        food: baseUpgradeCost.food * factor,
        wood: baseUpgradeCost.wood * factor,
    };
};

export const citiesReducer: Reducer<ServerState, ServerAction> = (state = initialState, action: ServerAction) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return initialState;
        }
        case 'UPGRADE_BUILDING': {
            const newCities = state.cities.map<ServerStateCity>((city) => {
                if (city.id !== action.payload.cityId) {
                    return city;
                }
                const buildingType = action.payload.buildingType;
                return {
                    ...city,
                    buildings: {
                        ...city.buildings,
                        [buildingType]: {
                            ...city.buildings[buildingType],
                            tier: city.buildings[buildingType].tier + 1
                        }
                    }
                };
            });
            return {
                ...state,
                cities: newCities
            };
        }
        case 'EXECUTE_TIME_STEP': {
            const stateTime = state.time;

            if (stateTime == null) {
                return {
                    ...state,
                    time: action.payload,
                };
            }

            const timeDelta = (Date.parse(action.payload) - Date.parse(stateTime)) / 1000;

            if (timeDelta <= 0) {
                console.error(`the time from action ${action.payload} is not past the time from the state ${stateTime}`);
                return state;
            }

            const citiesState = state.cities;

            const newCitiesState = citiesState.map<ServerStateCity>((city) => {
                    const {buildings, citizens, resources} = city;

                    const newBuildingsState = {
                        lumberMill: {
                            ...buildings.lumberMill,
                            upgradeCost: calculateBuildingUpgradeCost({
                                buildingType: 'lumberMill',
                                rules: state.rules,
                                tier: buildings.lumberMill.tier
                            })
                        },
                        pasture: {
                            ...buildings.pasture,
                            upgradeCost: calculateBuildingUpgradeCost({
                                buildingType: 'pasture',
                                rules: state.rules,
                                tier: buildings.lumberMill.tier
                            })
                        }
                    };

                    const foodChangeInfo = createFoodChangeInfo({
                        citizensQuantity: citizens.peasant.quantity,
                        pastureTier: city.buildings.pasture.tier,
                        rules: state.rules,
                    });

                    const woodChangeInfo = createWoodChangeInfo({
                        lumberMillTier: city.buildings.lumberMill.tier,
                        rules: state.rules,
                    });

                    const foodChangeRate = convertChangeInfoToChangeRate({changeInfo: foodChangeInfo});

                    const newFoodQuantity = Math.max(0, resources.food.quantity + convertChangeRateToDelta({
                        changeRate: foodChangeRate,
                        timeDelta
                    }));

                    const newWoodQuantity = Math.max(0, resources.wood.quantity + convertChangeRateToDelta({
                        changeRate: convertChangeInfoToChangeRate({changeInfo: woodChangeInfo}),
                        timeDelta
                    }));

                    const newResourcesState = {
                        food: {
                            ...resources.food,
                            changeInfo: foodChangeInfo,
                            quantity: newFoodQuantity
                        },
                        wood: {
                            ...resources.wood,
                            changeInfo: woodChangeInfo,
                            quantity: newWoodQuantity,
                        }
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

                    const peasantsChange = createPeasantChangeInfo({
                        buildingTiersSum,
                        citizensQuantity: citizens.peasant.quantity,
                        food: newFoodQuantity,
                        foodChangeRate,
                        rules: state.rules
                    });

                    const newPeasantsQuantity = Math.max(0, citizens.peasant.quantity + Math.floor(convertChangeRateToDelta({
                        changeRate: convertChangeInfoToChangeRate({changeInfo: peasantsChange}),
                        timeDelta
                    })));

                    const newCitizensState = {
                        peasant: {
                            ...citizens.peasant,
                            changeInfo: peasantsChange,
                            quantity: newPeasantsQuantity
                        }
                    };

                    return {
                        ...city,
                        buildings: newBuildingsState,
                        citizens: newCitizensState,
                        resources: newResourcesState,
                    };
                }
            );
            return {
                ...state,
                cities: newCitiesState
            };
        }
        default: {
            return state;
        }
    }
};

