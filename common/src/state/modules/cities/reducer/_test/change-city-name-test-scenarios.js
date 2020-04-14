// @flow

import {
    changeCityName,
} from '../../actions';
import {
    failure, success,
} from '../../../utils';
import {
    emptyCommonState,
} from '../../../state';
import {
    emptyCityState,
} from '../state';
import type {
    CommonChangeCityNameAction,
} from '../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './types';

type Scenarios = $ReadOnlyArray< CommonStateCitiesReducerTestScenarios< CommonChangeCityNameAction >, >

export const changeCityNameTestScenarios: Scenarios = [
    {
        action: changeCityName(
            {
                cityId  : `city1`,
                name    : `Newname`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: (
            {
                previousLocalState,
            },
        ) => {

            return success(
                {
                    state: {
                        ...previousLocalState,
                        city1: {
                            ...previousLocalState[ `city1` ],
                            name: `Newname`,
                        },
                    },
                },
            );

        },
        name               : `changes the name`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name   : `Oldname`,
                    ownerId: `player1`,
                },
            },
        },
    },
    {
        action: changeCityName(
            {
                cityId  : `city1`,
                name    : `Newname`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the city does not exist`,
                    ],
                },
            );

        },
        name               : `fails when city does not exist`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
            },
        },
    },
    {
        action: changeCityName(
            {
                cityId  : `city1`,
                name    : `Newname`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the city does not belong to the player`,
                    ],
                },
            );

        },
        name               : `fails when the city does not belong to the player`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name   : `Oldname`,
                    ownerId: `player2`,
                },
            },
        },
    },
    {
        action: changeCityName(
            {
                cityId  : `city1`,
                name    : `Ne`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the city name is too short`,
                    ],
                },
            );

        },
        name               : `fails when the name is too short`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name   : `Oldname`,
                    ownerId: `player1`,
                },
            },
        },
    },
    {
        action: changeCityName(
            {
                cityId  : `city1`,
                name    : `NewnameNewnameNewnameNewnameNewname`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the city name is too long`,
                    ],
                },
            );

        },
        name               : `fails when the name is too long`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name   : `Oldname`,
                    ownerId: `player1`,
                },
            },
        },
    },
    {
        action: changeCityName(
            {
                cityId  : `city1`,
                name    : `newname`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the city name does not follow the convention`,
                    ],
                },
            );

        },
        name               : `fails when the name does not start with a capital letter`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    ownerId: `player1`,
                },
            },
        },
    },
];
