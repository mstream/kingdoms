// @flow

import {
    abandonCity,
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
    CommonAbandonCityAction,
} from '../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './types';

type Scenarios = $ReadOnlyArray< CommonStateCitiesReducerTestScenarios< CommonAbandonCityAction >, >;

export const abandonCityTestScenarios: Scenarios = [
    {
        action: abandonCity(
            {
                cityId  : `city1`,
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
                            ownerId: null,
                        },
                    },
                },
            );

        },
        name               : `abandons city`,
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
    {
        action: abandonCity(
            {
                cityId  : `city1`,
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
        action: abandonCity(
            {
                cityId  : `city1`,
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
                    ownerId: `player2`,
                },
            },
        },
    },
];
