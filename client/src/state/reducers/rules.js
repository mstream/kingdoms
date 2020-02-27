/**
 * @flow
 */
import type { Reducer } from 'redux';
import type { ClientAction } from '../actions';
import type {
    CommonStateBuildingUpgradeCosts, CommonStateResources,
    CommonStateRules
} from '../../../../common/src/state';

const initialState: CommonStateRules = {
    baseCityCapacity: 0,
    buildingUpgradeCoefficient: 0,
    buildingUpgradeCosts: {
        lumberMill: {
            food: 0,
            wood: 0,
        },
        pasture: {
            food: 0,
            wood: 0,
        },
    },
    populationGrowthChangeRateCoefficient: 0,
    resourceIncreaseChangeRateCoefficient: 0,
    unitFoodDemand: 0,
    unitStarvingCoefficient: 0,
}

export const rulesReducer: Reducer<CommonStateRules, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'UPDATE_STATE': {
            return action.payload.serverState.rules;
        }
        default: {
            return state;
        }
    }
};
