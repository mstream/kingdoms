/**
 * @flow
 */

import type {Reducer} from 'redux';
import type {ServerAction} from '../actions';
import type {ServerState} from '../../../../common/src/state';
import {initialState} from './state';

const resourceIncreaseRateCoefficient = 1;
const unitFoodDemand = 0.0001;
const cityCapacity = 10000;
const populationGrowthRateCoefficient = 0.0001;

const calculateFoodChangeRate = ({citizensQuantity, pastureTier}) => {
    const increaseRate = resourceIncreaseRateCoefficient * pastureTier;
    const decreaseRate = citizensQuantity * unitFoodDemand;
    return increaseRate - decreaseRate;
};

const calculateWoodChangeRate = ({lumberMillTier}) => {
    const increaseRate = resourceIncreaseRateCoefficient * lumberMillTier;
    const decreaseRate = 0;
    return increaseRate - decreaseRate;
};

const calculatePeasantChangeRate = ({citizensQuantity}) => {
    return populationGrowthRateCoefficient * citizensQuantity * (1 - (citizensQuantity / cityCapacity));
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
                        const newResourcesState = {
                            food: {
                                ...resources.food,
                                quantity: resources.food.quantity + timeDelta * calculateFoodChangeRate({
                                    citizensQuantity: city.citizens.peasant.quantity,
                                    pastureTier: city.buildings.pasture.tier
                                })
                            },
                            wood: {
                                ...resources.wood,
                                quantity: resources.wood.quantity + timeDelta * calculateWoodChangeRate({
                                    lumberMillTier: city.buildings.lumberMill.tier
                                }),
                            }
                        };

                        const newCitizensState = {
                            peasant: {
                                ...citizens.peasant,
                                quantity: citizens.peasant.quantity + Math.floor(timeDelta * calculatePeasantChangeRate({
                                    citizensQuantity: citizens.peasant.quantity
                                }))
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
    }
;

