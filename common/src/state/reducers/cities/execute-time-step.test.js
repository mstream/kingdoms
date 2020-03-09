// @flow

import {executeTimeStep} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonState
} from '../../../../../common/src/state';
import type {CommonstateReducerResult} from '../root';
import {executeTimeStepCitiesReducer} from './execute-time-step';
import {
    emptyCityState,
    emptyCommonstate
} from '../../../../../common/src/state';

describe('executeTimeStepCitiesReducer', () => {
    it('previous time newer than the one from action', () => {
        const previousState: CommonState = {
            ...emptyCommonstate,
            time: '2000-01-01T02:00:00Z',
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected: CommonstateReducerResult<CommonStateCities> = {
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
        const previousState: CommonState = {
            ...emptyCommonstate,
            cities: {
                '1': {
                    ...emptyCityState,
                    units: {
                        ...emptyCityState.units,
                        peasant: 0,
                    },
                }
            },
            rules: {
                ...emptyCommonstate.rules,
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
        const expected: CommonstateReducerResult<CommonStateCities> = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    ...previousState.cities['1'],
                    units: {
                        ...previousState.cities['1'].units,
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