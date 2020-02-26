/**
 * @flow
 */

import type {
    ServerAbandonCityAction,
    ServerChangeCityNameAction,
    ServerExecuteTimeStepAction,
    ServerResetStateAction,
    ServerUpgradeBuildingAction
} from '../../../../../common/src/actions';
import type {
    CommonStateCities, CommonStateCity,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {failure, success} from '../root';
import {initialState} from '../../state';
import {
    calculateBuildingsUpgradeCost,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
    convertChangeRateToDelta
} from '../../../../../common/src/state';
import {convertQuantitiesToResources} from '../../../../../common/src/resource';
import {subtractQuantities} from '../../../../../common/src/quantity';
import {EMPTY_OBJECT} from '../../../../../common/src/util';

export const executeTimeStepCitiesReducer = ({action, state}: { action: ServerExecuteTimeStepAction, state: ServerState }): ServerStateReducerResult<CommonStateCities> => {
    const stateTime = state.time;

    const timeDelta = (Date.parse(action.payload) - Date.parse(stateTime)) / 1000;

    if (timeDelta <= 0) {
        return failure({errors: [`the time from the action is not past the time from the state`]});
    }

    const citiesState = state.cities;

    const newState = citiesState.map<CommonStateCity>((city) => {
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

    return success({state: newState});
};
