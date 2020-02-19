/**
 * @flow
 */

import type {Reducer} from 'redux';
import type {ServerAction} from '../actions';
import type {ChangeInfo, ServerState} from '../../../../common/src/state';
import {initialState} from './state';

const resourceIncreaseChangeRateCoefficient = 10000;
const unitFoodDemand = 1;
const unitStarvingCoefficient = 0.2;
const baseCityCapacity = 1000;
const populationGrowthChangeRateCoefficient = 1;

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

const createFoodChangeInfo = ({citizensQuantity, pastureTier}: { citizensQuantity: number, pastureTier: number }): ChangeInfo => {
    return {
        'pasture production': resourceIncreaseChangeRateCoefficient * pastureTier,
        'citizens maintenance': -citizensQuantity * unitFoodDemand
    };
};

const createWoodChangeInfo = ({lumberMillTier}: { lumberMillTier: number }): ChangeInfo => {
    return {
        'lumber mill production': resourceIncreaseChangeRateCoefficient * lumberMillTier,
    };
};

const createPeasantChangeInfo = ({buildingTiersSum, citizensQuantity, food, foodChangeRate}: { buildingTiersSum: number, citizensQuantity: number, food: number, foodChangeRate: number }) => {
    const starvingPeopleQuantity = food > 0 || foodChangeRate > 0 ? 0 : Math.abs(foodChangeRate * unitFoodDemand);
    const cityCapacity = baseCityCapacity + Math.max(0, baseCityCapacity * buildingTiersSum - starvingPeopleQuantity * unitStarvingCoefficient);
    const growthFactorChange = populationGrowthChangeRateCoefficient * citizensQuantity * (1 - (citizensQuantity / cityCapacity));
    return {
        'growth rate': growthFactorChange
    };
};

export const citiesReducer: Reducer<ServerState, ServerAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'STATE_UPDATED': {
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

            const newCitiesState = citiesState.map(city => {
                    const citizens = city.citizens;
                    const resources = city.resources;

                    const foodChangeInfo = createFoodChangeInfo({
                        citizensQuantity: citizens.peasant.quantity,
                        pastureTier: city.buildings.pasture.tier
                    });

                    const woodChangeInfo = createWoodChangeInfo({
                        lumberMillTier: city.buildings.lumberMill.tier
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
                        foodChangeRate
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

