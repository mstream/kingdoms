// @flow

import {
    failure, success,
} from '../../../utils';
import {
    emptyCommonState,
} from '../../../state';
import {
    PLAYER_STATUS_DEFEATED, PLAYER_STATUS_PLAYING,
} from '../types';
import type {
    CommonStatePlayersReducerTestScenario,
} from './types';
import type {
    CommonCreateScheduledAttackOrderAction,
} from '../../../orders/actions/types';
import {
    createScheduledAttackOrder,
} from '../../../orders/actions';
import {
    emptyRegimentTemplateState,
} from '../../../orders/reducer/state';

type Scenarios = $ReadOnlyArray< CommonStatePlayersReducerTestScenario< CommonCreateScheduledAttackOrderAction >, >;

export const createOrderTestScenarios: Scenarios = [
    {
        action: createScheduledAttackOrder(
            {
                minimumDelay    : 0,
                orderId         : `order1`,
                originCityId    : `city1`,
                playerId        : `player1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                },
                targetCityId: `city2`,
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
                    },
                },
            );

        },
        name               : `players is playing`,
        previousGlobalState: {
            ...emptyCommonState,
            players: {
                player1: PLAYER_STATUS_PLAYING,
            },
        },
    },
    {
        action: createScheduledAttackOrder(
            {
                minimumDelay    : 0,
                orderId         : `order1`,
                originCityId    : `city1`,
                playerId        : `player1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                },
                targetCityId: `city2`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the player is not playing`,
                    ],
                },
            );

        },
        name               : `players is defeated`,
        previousGlobalState: {
            ...emptyCommonState,
            players: {
                player1: PLAYER_STATUS_DEFEATED,
            },
        },
    },
    {
        action: createScheduledAttackOrder(
            {
                minimumDelay    : 0,
                orderId         : `order1`,
                originCityId    : `city1`,
                playerId        : `player1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                },
                targetCityId: `city2`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the player is not playing`,
                    ],
                },
            );

        },
        name               : `players does not exist`,
        previousGlobalState: {
            ...emptyCommonState,
            players: {
            },
        },
    },
];
