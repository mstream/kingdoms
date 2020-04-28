// @flow

import {
    PLAYER_STATUS_DEFEATED, PLAYER_STATUS_PLAYING,
} from '../types';
import {
    createCity,
} from '../../../cities/actions';
import {
    emptyCommonState,
} from '../../../../state';
import {
    failure, success,
} from '../../../../utils';
import type {
    CommonCreateCityAction,
} from '../../../cities/actions/types';
import type {
    CommonStatePlayersReducerTestScenario,
} from './types';

type Scenario = CommonStatePlayersReducerTestScenario< CommonCreateCityAction >;
type Scenarios = $ReadOnlyArray< Scenario, >;

export const createCityTestScenarios: Scenarios = [
    {
        action: createCity(
            {
                cityId  : `city1`,
                name    : `Abc`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: {
                        player1: PLAYER_STATUS_PLAYING,
                    },
                },
            );

        },
        name               : `adds the first player`,
        previousGlobalState: {
            ...emptyCommonState,
            players: {
            },
        },
    },
    {
        action: createCity(
            {
                cityId  : `city2`,
                name    : `Abc`,
                playerId: `player2`,
            },
        ),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: {
                        player1: PLAYER_STATUS_PLAYING,
                        player2: PLAYER_STATUS_PLAYING,
                    },
                },
            );

        },
        name               : `adds the second player`,
        previousGlobalState: {
            ...emptyCommonState,
            players: {
                player1: PLAYER_STATUS_PLAYING,
            },
        },
    },
    {
        action: createCity(
            {
                cityId  : `city2`,
                name    : `Abc`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the player is already playing`,
                    ],
                },
            );

        },
        name               : `fails when a playing player already exists`,
        previousGlobalState: {
            ...emptyCommonState,
            players: {
                player1: PLAYER_STATUS_PLAYING,
            },
        },
    },
    {
        action: createCity(
            {
                cityId  : `city2`,
                name    : `Abc`,
                playerId: `player1`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the player has already been defeated`,
                    ],
                },
            );

        },
        name               : `fails when a defeated player already exists`,
        previousGlobalState: {
            ...emptyCommonState,
            players: {
                player1: PLAYER_STATUS_DEFEATED,
            },
        },
    },
];
