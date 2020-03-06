// @flow

import {executeTimeStep} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {executeTimeStepCitiesReducer} from './execute-time-step';
import {
    emptyCityState,
    emptyServerState
} from '../../../../../common/src/state';

describe('executeTimeStepCitiesReducer', () => {
    it('previous time newer than the one from action', () => {
        const previousState: ServerState = {
            ...emptyServerState,
            time: '2000-01-01T02:00:00Z',
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: ['the time from the action is not past the time from the state'],
            state: null,
        };
        const actual = executeTimeStepCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('empty city gains peasants because of migration', () => {
        const previousState: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0
                        }
                    },
                    citizens: {
                        peasant: 0,
                    },
                    resources: {
                        food: 0,
                        wood: 0,
                    }
                }
            },
            rules: {
                ...emptyServerState.rules,
                baseCityCapacity: 1000,
                basePeasantsMigrationRate: 100,
                populationGrowthChangeRateCoefficient: 1,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 1,
            },
            time: '2000-01-01T00:00:00Z',
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    ...previousState.cities['1'],
                    citizens: {
                        ...previousState.cities['1'].citizens,
                        peasant: 100,
                    }
                }
            }
        };
        const actual = executeTimeStepCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

});