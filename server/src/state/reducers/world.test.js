/**
 * @flow
 */

import {worldReducer} from './world';
import {initialState} from '../state';
import type {
    CommonStateWorld,
    ServerState
} from '../../../../common/src/state';
import type {ServerStateReducerResult} from './root';
import {success} from './root';

describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            cities: {},
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
                minimalCityMargin: {
                    x: 3,
                    y: 3,
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 10, y: 10},},
        };
        const expected: ServerStateReducerResult<CommonStateWorld> = {
            errors: [],
            state: initialState.world,
        };
        const actual = worldReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
    it('returns the current state on unsupported action', () => {
        const action = {
            type: '_DUMMY_',
        };
        const previousState: ServerState = {
            cities: {},
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
                minimalCityMargin: {
                    x: 3,
                    y: 3,
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 10, y: 10},},
        };
        success({state: previousState.world});
        const actual = worldReducer({action, state: previousState});
        const expected: ServerStateReducerResult<CommonStateWorld> = {
            errors: [],
            state: {size: {x: 10, y: 10},}
        };
        expect(actual).toEqual(expected);
    });
});
