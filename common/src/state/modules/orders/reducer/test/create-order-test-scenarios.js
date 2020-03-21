// @flow

import type { CommonStateOrdersReducerTestScenarios } from './types';
import type { CommonCreateOrderAction } from '../../actions/types';
import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../../../cities/reducer/state';
import { createOrder } from '../../actions';
import {
    emptyOrdersState,
    emptyOrderState,
    emptyRegimentTemplateState,
} from '../state';
import { UNIT_PIKEMAN } from '../../../rules/reducer/types';
import { failure, success } from '../../../utils';

type Scenarios = $ReadOnlyArray<CommonStateOrdersReducerTestScenarios<CommonCreateOrderAction>>;

export const createOrderTestScenarios: Scenarios = [
    {
        name: 'creates order',
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
            time: '2000-01-01T01:00:00Z',
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state: {
                        ...previousLocalState,
                        'order1': {
                            authorityId: 'player1',
                            creationTime: '2000-01-01T01:00:00Z',
                            minimumDelay: 10,
                            originCityId: 'city1',
                            regimentTemplate: {
                                ...emptyRegimentTemplateState,
                                [UNIT_PIKEMAN]: {
                                    from: 10,
                                    to: 20,
                                },
                            },
                            targetCityId: 'city2',
                        },
                    },
                },
            );
        },
    },
    {
        name: 'fails when order with the same id already exists',
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
            orders: {
                ...emptyCommonState.orders,
                'order1': {
                    ...emptyOrderState,
                }

            },
            time: '2000-01-01T01:00:00Z',
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure(
                {
                    errors: ['order with the same id already exists'],
                },
            );
        },
    },
];
