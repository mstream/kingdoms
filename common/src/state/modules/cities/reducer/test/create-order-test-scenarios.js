// @flow

import { UNIT_PIKEMAN } from '../../../rules/reducer/types';
import { failure, success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import type { CommonStateCitiesReducerTestScenarios } from './types';
import type { CommonCreateOrderAction } from '../../../orders/actions/types';
import { createOrder } from '../../../orders/actions';
import { emptyRegimentTemplateState } from '../../../orders/reducer/state';
import { emptyCityState } from '../state';


export const createOrderTestScenarios: $ReadOnlyArray<CommonStateCitiesReducerTestScenarios<CommonCreateOrderAction>> = [
    {
        name: 'accepts a valid order',
        action: createOrder({
            minimumDelay: 10,
            orderId: 'order1',
            originCityId: 'city1',
            playerId: 'player1',
            regimentTemplate: {
                ...emptyRegimentTemplateState,
                [UNIT_PIKEMAN]: {
                    from: 10,
                    to: 20,
                },
            },
            targetCityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                'city1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
                'city2': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state:
                        {
                            ...previousLocalState,
                        },
                },
            );
        },
    },
    {
        name: 'fails when the origin city does not exist',
        action: createOrder({
            minimumDelay: 10,
            orderId: 'order1',
            originCityId: 'city1',
            playerId: 'player1',
            regimentTemplate: {
                ...emptyRegimentTemplateState,
                [UNIT_PIKEMAN]: {
                    from: 10,
                    to: 20,
                },
            },
            targetCityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                'city2': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: ['the origin city does not exist']
                },
            );
        },
    },
    {
        name: 'fails when the origin city does not belong to the player',
        action: createOrder({
            minimumDelay: 10,
            orderId: 'order1',
            originCityId: 'city1',
            playerId: 'player1',
            regimentTemplate: {
                ...emptyRegimentTemplateState,
                [UNIT_PIKEMAN]: {
                    from: 10,
                    to: 20,
                },
            },
            targetCityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                'city1': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
                'city2': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: ['the origin city does not belong to the player']
                },
            );
        },
    },
    {
        name: 'fails when the target city does not exist',
        action: createOrder({
            minimumDelay: 10,
            orderId: 'order1',
            originCityId: 'city1',
            playerId: 'player1',
            regimentTemplate: {
                ...emptyRegimentTemplateState,
                [UNIT_PIKEMAN]: {
                    from: 10,
                    to: 20,
                },
            },
            targetCityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                'city1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: ['the target city does not exist']
                },
            );
        },
    },
];