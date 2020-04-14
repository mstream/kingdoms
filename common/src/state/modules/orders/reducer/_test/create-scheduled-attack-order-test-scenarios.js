// @flow

import type {
    CommonStateOrdersReducerTestScenarios,
} from './types';
import type {
    CommonCreateScheduledAttackOrderAction,
} from '../../actions/types';
import {
    emptyCommonState,
} from '../../../state';
import {
    createScheduledAttackOrder,
} from '../../actions';
import {
    emptyRegimentTemplateState,
    emptyScheduledAttackOrderState,
} from '../state';
import {
    UNIT_PIKEMAN,
} from '../../../rules/reducer/types';
import {
    failure, success,
} from '../../../utils';

type Scenarios = $ReadOnlyArray< CommonStateOrdersReducerTestScenarios< CommonCreateScheduledAttackOrderAction >, >;

export const createScheduledAttackOrderTestScenarios: Scenarios = [
    {
        action: createScheduledAttackOrder(
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
                        creationTimes: {
                            order1: `2000-01-01T01:00:00Z`,
                        },
                        items: {
                            scheduledAttack: {
                                order1: {
                                    minimumDelay    : 10,
                                    originCityId    : `city1`,
                                    regimentTemplate: {
                                        ...emptyRegimentTemplateState,
                                        [ UNIT_PIKEMAN ]: {
                                            from: 10,
                                            to  : 20,
                                        },
                                    },
                                    targetCityId: `city2`,
                                },
                            },
                        },
                        ownerships: {
                            order1: `player1`,
                        },
                    },
                },
            );

        },
        name               : `creates order`,
        previousGlobalState: {
            ...emptyCommonState,
            time: `2000-01-01T01:00:00Z`,
        },
    },
    {
        action: createScheduledAttackOrder(
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
                        `order with the same id already exists`,
                    ],
                },
            );

        },
        name               : `fails when order with the same id already exists`,
        previousGlobalState: {
            ...emptyCommonState,
            orders: {
                ...emptyCommonState.orders,
                items: {
                    ...emptyCommonState.orders.items,
                    scheduledAttack: {
                        order1: {
                            ...emptyScheduledAttackOrderState,
                        },
                    },
                },
            },
            time: `2000-01-01T01:00:00Z`,
        },
    },
];
