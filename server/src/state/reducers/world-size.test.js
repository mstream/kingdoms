/**
 * @flow
 */

import {worldSizeReducer} from './world-size';
import {initialState} from '../state';
import type {
    CommonStateWorldSize,
    ServerState
} from '../../../../common/src/state';
import type {ServerStateReducerResult} from './root';
import {success} from './root';

describe('worldSizeReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            cities: [],
            rules: {
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
                    }
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 20, y: 20},
        };
        const expected: ServerStateReducerResult<CommonStateWorldSize> = {
            errors: [],
            state: initialState.worldSize,
        };
        const actual = worldSizeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
    it('returns the current state on unsupported action', () => {
        const action = {
            type: '_DUMMY_',
        };
        const previousState: ServerState = {
            cities: [],
            rules: {
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
                    }
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 20, y: 20},
        };
        success({state: previousState.worldSize});
        const actual = worldSizeReducer({action, state: previousState});
        const expected: ServerStateReducerResult<CommonStateWorldSize> = {
            errors: [],
            state: {x: 20, y: 20}
        };
        expect(actual).toEqual(expected);
    });
});
