// @flow

import { createCity } from '../../actions';
import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../../rules/reducer/types';
import { failure, success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../state';
import type {
    CommonChangeCityNameAction,
    CommonCreateCityAction,
} from '../../actions/types';
import type { CommonStateCitiesReducerTestScenarios } from './types';

export const createCityTestScenarios: $ReadOnlyArray<
    CommonStateCitiesReducerTestScenarios<CommonCreateCityAction>,
> = [
    {
        name: 'creates a city',
        action: createCity({
            cityId: `city1`,
            name: `Name`,
            playerId: `player1`,
        }),
        previousGlobalState: {
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
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success({
                state: {
                    ...previousLocalState,
                    city1: {
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
            });
        },
    },
    {
        name: 'fails when there is not enough space for the city',
        action: createCity({
            cityId: 'city1',
            name: 'Newname',
            playerId: 'player1',
        }),
        previousGlobalState: {
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
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: [`there is no space for another city`],
            });
        },
    },
    {
        name: 'fails when the name is too short',
        action: createCity({
            cityId: 'city1',
            name: 'Ne',
            playerId: 'player1',
        }),
        previousGlobalState: {
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
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city name is too short'],
            });
        },
    },
    {
        name: 'fails when the name is too long',
        action: createCity({
            cityId: 'city1',
            name: 'NewnameNewnameNewnameNewnameNewname',
            playerId: 'player1',
        }),
        previousGlobalState: {
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
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city name is too long'],
            });
        },
    },
    {
        name: 'fails when the name does not start with a capital letter',
        action: createCity({
            cityId: 'city1',
            name: 'newname',
            playerId: 'player1',
        }),
        previousGlobalState: {
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
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city name does not follow the convention'],
            });
        },
    },
    {
        name: 'fails when the player already owns a city',
        action: createCity({
            cityId: 'city1',
            name: 'newname',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                city1: {
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
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city name does not follow the convention'],
            });
        },
    },
];
