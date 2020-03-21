// @flow

import { failure, success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import { PLAYER_STATUS_DEFEATED, PLAYER_STATUS_PLAYING } from '../types';
import type { CommonStatePlayersReducerTestScenario } from './types';
import type { CommonCreateOrderAction } from '../../../orders/actions/types';
import { createOrder } from '../../../orders/actions';
import { emptyRegimentTemplateState } from '../../../orders/reducer/state';

type Scenarios = $ReadOnlyArray<CommonStatePlayersReducerTestScenario<CommonCreateOrderAction>>;

export const createOrderTestScenarios: Scenarios = [
    {
        name: `players is playing`,
        action: createOrder({
            playerId: 'player1',
            minimumDelay: 0,
            orderId: 'order1',
            originCityId: 'city1',
            regimentTemplate: {
                ...emptyRegimentTemplateState,
            },
            targetCityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            players: {
                'player1': PLAYER_STATUS_PLAYING,
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success({
                state: {
                    ...previousLocalState,
                },
            });
        },
    },
    {
        name: `players is defeated`,
        action: createOrder({
            playerId: 'player1',
            minimumDelay: 0,
            orderId: 'order1',
            originCityId: 'city1',
            regimentTemplate: {
                ...emptyRegimentTemplateState,
            },
            targetCityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            players: {
                'player1': PLAYER_STATUS_DEFEATED,
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the player is not playing'],
            });
        },
    },
    {
        name: `players does not exist`,
        action: createOrder({
            playerId: 'player1',
            minimumDelay: 0,
            orderId: 'order1',
            originCityId: 'city1',
            regimentTemplate: {
                ...emptyRegimentTemplateState,
            },
            targetCityId: 'city2',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            players: {},
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the player is not playing'],
            });
        },
    },
];
