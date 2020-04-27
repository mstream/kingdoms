// @flow

import {
    UNIT_PIKEMAN,
} from '../../../rules/reducer/types';
import {
    emptyCityState,
} from '../state';
import {
    emptyCommonState,
} from '../../../../state';
import {
    emptyRegimentTemplateState,
} from '../../../orders/reducer/state';
import {
    failure, success,
} from '../../../../utils';
import {
    ordersActions,
} from '../../../orders/actions';
import type {
    CommonCreateScheduledAttackOrderAction,
} from '../../../orders/actions/_children/creade-scheduled-attack-order/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './types';

type Scenario = CommonStateCitiesReducerTestScenarios< CommonCreateScheduledAttackOrderAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const createOrderTestScenarios: Scenarios = [
    {
        action: ordersActions.createScheduledAttackOrder(
            {
                minimumDelay    : 10,
                orderId         : `order1`,
                originCityId    : `city1`,
                playerId        : `player1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                    [ UNIT_PIKEMAN ]: {
                        from: 10,
                        to  : 20,
                    },
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
        name               : `accepts a valid order`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                city1: {
                    ...emptyCityState,
                    ownerId: `player1`,
                },
                city2: {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
            },
        },
    },
    {
        action: ordersActions.createScheduledAttackOrder(
            {
                minimumDelay    : 10,
                orderId         : `order1`,
                originCityId    : `city1`,
                playerId        : `player1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                    [ UNIT_PIKEMAN ]: {
                        from: 10,
                        to  : 20,
                    },
                },
                targetCityId: `city2`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the origin city does not exist`,
                    ],
                },
            );

        },
        name               : `fails when the origin city does not exist`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                city2: {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
            },
        },
    },
    {
        action: ordersActions.createScheduledAttackOrder(
            {
                minimumDelay    : 10,
                orderId         : `order1`,
                originCityId    : `city1`,
                playerId        : `player1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                    [ UNIT_PIKEMAN ]: {
                        from: 10,
                        to  : 20,
                    },
                },
                targetCityId: `city2`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the origin city does not belong to the player`,
                    ],
                },
            );

        },
        name               : `fails when the origin city does not belong to the player`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                city1: {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
                city2: {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
            },
        },
    },
    {
        action: ordersActions.createScheduledAttackOrder(
            {
                minimumDelay    : 10,
                orderId         : `order1`,
                originCityId    : `city1`,
                playerId        : `player1`,
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                    [ UNIT_PIKEMAN ]: {
                        from: 10,
                        to  : 20,
                    },
                },
                targetCityId: `city2`,
            },
        ),
        expectedReductionResultCreator: () => {

            return failure(
                {
                    errors: [
                        `the target city does not exist`,
                    ],
                },
            );

        },
        name               : `fails when the target city does not exist`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                city1: {
                    ...emptyCityState,
                    ownerId: `player1`,
                },
            },
        },
    },
];
