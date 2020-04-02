// @flow

import { abandonCity } from '../../actions';
import { failure, success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../state';
import type { CommonAbandonCityAction } from '../../actions/types';
import type { CommonStateCitiesReducerTestScenarios } from './types';

export const abandonCityTestScenarios: $ReadOnlyArray<
    CommonStateCitiesReducerTestScenarios<CommonAbandonCityAction>,
> = [
    {
        name: 'abandons city',
        action: abandonCity({
            cityId: 'city1',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success({
                state: {
                    ...previousLocalState,
                    city1: {
                        ...previousLocalState['city1'],
                        ownerId: null,
                    },
                },
            });
        },
    },
    {
        name: 'fails when city does not exist',
        action: abandonCity({
            cityId: 'city1',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {},
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city does not exist'],
            });
        },
    },
    {
        name: 'fails when the city does not belong to the player',
        action: abandonCity({
            cityId: 'city1',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city does not belong to the player'],
            });
        },
    },
];
