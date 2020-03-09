// @flow

import {upgradeBuildingCitiesReducer} from './upgrade-building';
import {upgradeBuilding} from '../../../../../common/src/actions';
import type {CommonState} from '../../../../../common/src/state';
import {
    emptyCityState,
    emptyCommonstate
} from '../../../../../common/src/state';

describe('upgradeBuildingCitiesReducer', () => {
    it('fails when city does not exist', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: 'player1'
        });
        const previousState: CommonState = {
            ...emptyCommonstate,
        };
        const expected = {
            errors: ['the city does not exist'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when city does not belong to the player', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: 'player1'
        });
        const previousState: CommonState = {
            ...emptyCommonstate,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player2'
                }
            }
        };
        const expected = {
            errors: ['the city does not belong to the player'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when the resources are insufficient', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: 'player1',
        });
        const previousState: CommonState = {
            ...emptyCommonstate,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                    buildings: {
                        ...emptyCityState.buildings,
                        pasture: {
                            tier: 0,
                        }
                    },
                    resources: {
                        food: 100,
                        wood: 100,
                    }
                }
            },
            rules: {
                ...emptyCommonstate.rules,
                buildingUpgradeCosts: {
                    ...emptyCommonstate.rules.buildingUpgradeCosts,
                    pasture: {
                        food: 200,
                        wood: 200,
                    },
                },
            }
        };
        const expected = {
            errors: ['insufficient food', 'insufficient wood'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('upgrades the tier and decreases used resources', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: 'player1'
        });
        const previousState: CommonState = {
            ...emptyCommonstate,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                    buildings: {
                        ...emptyCityState.buildings,
                        pasture: {
                            tier: 0,
                        },
                    },
                    resources: {
                        food: 400,
                        wood: 300,
                    }
                }
            },
            rules: {
                ...emptyCommonstate.rules,
                buildingUpgradeCosts: {
                    ...emptyCommonstate.rules.buildingUpgradeCosts,
                    pasture: {
                        food: 200,
                        wood: 200,
                    },
                },
            }
        };
        const expected = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    ...previousState.cities['1'],
                    buildings: {
                        ...previousState.cities['1'].buildings,
                        pasture: {
                            ...previousState.cities['1'].buildings.pasture,
                            tier: 1
                        }
                    },
                    resources: {
                        ...previousState.cities['1'].resources,
                        food: 200,
                        wood: 100,
                    }
                }
            }
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });
});