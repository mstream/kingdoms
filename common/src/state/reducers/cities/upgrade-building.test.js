// @flow

import { upgradeBuildingCitiesReducer } from './upgrade-building';
import { upgradeBuilding } from '../../../../../common/src/actions';
import type { CommonState } from '../../state';
import {
    BUILDING_PASTURE,
    emptyCityState,
    emptyCommonState,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../state';

describe('upgradeBuildingCitiesReducer', () => {
    it('fails when city does not exist', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: 'player1',
        });
        const previousState: CommonState = {
            ...emptyCommonState,
        };
        const expected = {
            errors: ['the city does not exist'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it('fails when city does not belong to the player', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: 'player1',
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
            },
        };
        const expected = {
            errors: ['the city does not belong to the player'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it('fails when the resources are insufficient', () => {
        const action = upgradeBuilding({
            buildingType: BUILDING_PASTURE,
            cityId: '1',
            playerId: 'player1',
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                    buildings: {
                        ...emptyCityState.buildings,
                        [BUILDING_PASTURE]: {
                            tier: 0,
                        },
                    },
                    resources: {
                        [RESOURCE_FOOD]: 100,
                        [RESOURCE_WOOD]: 100,
                    },
                },
            },
            rules: {
                ...emptyCommonState.rules,
                buildingUpgradeCosts: {
                    ...emptyCommonState.rules.buildingUpgradeCosts,
                    [BUILDING_PASTURE]: {
                        // $FlowFixMe
                        [RESOURCE_FOOD]: 200,
                        // $FlowFixMe
                        [RESOURCE_WOOD]: 200,
                    },
                },
            },
        };
        const expected = {
            errors: ['insufficient RESOURCE_FOOD', 'insufficient RESOURCE_WOOD'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it('upgrades the tier and decreases used resources', () => {
        const action = upgradeBuilding({
            buildingType: BUILDING_PASTURE,
            cityId: '1',
            playerId: 'player1',
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                    buildings: {
                        ...emptyCityState.buildings,
                        [BUILDING_PASTURE]: {
                            tier: 0,
                        },
                    },
                    resources: {
                        [RESOURCE_FOOD]: 400,
                        [RESOURCE_WOOD]: 300,
                    },
                },
            },
            rules: {
                ...emptyCommonState.rules,
                buildingUpgradeCosts: {
                    ...emptyCommonState.rules.buildingUpgradeCosts,
                    [BUILDING_PASTURE]: {
                        // $FlowFixMe
                        [RESOURCE_FOOD]: 200,
                        // $FlowFixMe
                        [RESOURCE_WOOD]: 200,
                    },
                },
            },
        };
        const expected = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    ...previousState.cities['1'],
                    buildings: {
                        ...previousState.cities['1'].buildings,
                        [BUILDING_PASTURE]: {
                            ...previousState.cities['1'].buildings[BUILDING_PASTURE],
                            tier: 1,
                        },
                    },
                    resources: {
                        ...previousState.cities['1'].resources,
                        [RESOURCE_FOOD]: 200,
                        [RESOURCE_WOOD]: 100,
                    },
                },
            },
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });
});