/**
 * @flow
 */

import type {ServerStateReducerResult} from './root';
import {rootReducer} from './root';
import type {ServerState} from '../../../../common/src/state';
import {initialState} from '../state';

describe('rootReducer', () => {
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
            worldSize: {x: 10, y: 10},
        };
        const expected: ServerStateReducerResult<ServerState> = {
            errors: [],
            state: initialState,
        };
        const actual = rootReducer({action, state: previousState});
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
            worldSize: {x: 10, y: 10},
        };
        const expected: ServerStateReducerResult<ServerState> = {
            errors: [],
            state: {
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
                worldSize: {x: 10, y: 10},
            },
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
