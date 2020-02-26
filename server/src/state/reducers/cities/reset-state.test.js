/**
 * @flow
 */

import {resetState} from '../../../../../common/src/actions';
import {initialState} from '../../state';
import {resetStateCitiesReducer} from './reset-state';
import type {ServerState} from '../../../../../common/src/state';

describe('resetStateCitiesReducer', () => {
    it('returns the initial state', () => {
        const action = resetState();
        const previousState: ServerState = {
            cities: [
                {
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0,
                    },
                    id: '1',
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
                {
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0,
                    },
                    id: '2',
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'Bbb',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            ],
            rules: {
                baseCityCapacity: 1000,
                buildingUpgradeCoefficient: 0.5,
                buildingUpgradeCosts: {
                    lumberMill: {
                        food: 0,
                        wood: 100,
                    },
                    pasture: {
                        food: 0,
                        wood: 50,
                    },
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 10, y: 10}
        };
        const expected = {
            errors: [],
            state: initialState.cities,
        };
        const actual = resetStateCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});