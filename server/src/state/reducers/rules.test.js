/**
 * @flow
 */

import {rulesReducer} from './rules';
import {initialState} from '../state';
import type {CommonStateRules, ServerState} from '../../../../common/src/state';
import {worldReducer} from './world';
import type {ServerStateReducerResult} from './root';

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
        const expected: ServerStateReducerResult<CommonStateRules> = {
            errors: [],
            state: initialState.rules,
        };
        const actual = rulesReducer({action, state: previousState});
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
        const expected: ServerStateReducerResult<CommonStateRules> = {
            errors: [],
            state: {
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
            }
        };

        const actual = rulesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
