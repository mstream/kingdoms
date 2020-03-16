// @flow

import { createCity } from '../../../../../common/src/actions';
import { createCityCitiesReducer } from './create-city';
import type { CommonState } from '../../index';
import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
    emptyCityState,
    emptyCommonState,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../index';

describe(`createCityCitiesReducer`, () => {
    it(`fails when there is not enough space for the city`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Name`,
            playerId: `player1`,
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                },
            },
            world: {
                size: {
                    x: 1,
                    y: 1,
                },
            },
        };
        const expected = {
            errors: [`there is no space for another city`],
            state: null,
        };
        const actual = createCityCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it(`fails when the city name is too short`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Na`,
            playerId: `player1`,
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                },
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                },
            },
        };
        const expected = {
            errors: [`the city name is too short`],
            state: null,
        };
        const actual = createCityCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it(`fails when the city name is too long`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Namenamenamenamenamename`,
            playerId: `player1`,
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                },
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                },
            },
        };
        const expected = {
            errors: [`the city name is too long`],
            state: null,
        };
        const actual = createCityCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it(`fails when the city does not follow the convention`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `name`,
            playerId: `player1`,
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                },
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                },
            },
        };
        const expected = {
            errors: [`the city name does not follow the convention`],
            state: null,
        };
        const actual = createCityCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it(`fails when the player already owns any city`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Name`,
            playerId: `player1`,
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                '1': {
                    ...emptyCityState,
                    location: {
                        x: 0,
                        y: 0,
                    },
                    ownerId: `player1`,
                },
            },
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                },
            },
            world: {
                size: {
                    x: 5,
                    y: 5,
                },
            },
        };
        const expected = {
            errors: [`player already owns a city`],
            state: null,
        };
        const actual = createCityCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });

    it(`creates a new city`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Name`,
            playerId: `player1`,
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                },
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                },
            },
        };
        const expected = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    buildings: {
                        [BUILDING_LUMBER_MILL]: {
                            tier: 0,
                        },
                        [BUILDING_PASTURE]: {
                            tier: 0,
                        },
                        [BUILDING_WAREHOUSE]: {
                            tier: 0,
                        },
                    },
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: `Name`,
                    orders: {},
                    ownerId: `player1`,
                    resources: {
                        [RESOURCE_FOOD]: 0,
                        [RESOURCE_WOOD]: 0,
                    },
                    units: {
                        [UNIT_ARCHER]: 0,
                        [UNIT_CATAPULT]: 0,
                        [UNIT_KNIGHT]: 0,
                        [UNIT_NOBLE]: 0,
                        [UNIT_PEASANT]: 0,
                        [UNIT_PIKEMAN]: 0,
                        [UNIT_SWORDSMAN]: 0,
                    },
                },
            },
        };
        const actual = createCityCitiesReducer({
            action,
            state: previousState,
        });
        expect(actual).toEqual(expected);
    });
});