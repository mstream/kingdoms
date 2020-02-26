/**
 * @flow
 */

import {initialState} from '../state';
import {timeReducer} from './time';
import type {CommonStateTime, ServerState} from '../../../../common/src/state';
import {worldSizeReducer} from './world-size';
import {executeTimeStep} from '../../../../common/src/actions';
import type {ServerStateReducerResult} from './root';

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
            worldSize: {x: 10, y: 10},
        };
        const expected: ServerStateReducerResult<CommonStateTime> = {
            errors: [],
            state: initialState.time,
        };
        const actual = timeReducer({action, state: previousState});
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
        const expected: ServerStateReducerResult<CommonStateTime> = {
            errors: [],
            state: '2000-01-01T00:00:00Z',
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
    it('updates time on execute time step action', () => {
        const action = executeTimeStep({time: 'NEW_TIME'});
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
        const expected: ServerStateReducerResult<CommonStateTime> = {
            errors: [],
            state: 'NEW_TIME',
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
