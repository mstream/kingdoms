// @flow

import { changeCityName } from '../../actions';
import { failure, success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../state';
import type { CommonChangeCityNameAction } from '../../actions/types';
import type { CommonStateCitiesReducerTestScenarios } from './types';

export const changeCityNameTestScenarios: $ReadOnlyArray<
    CommonStateCitiesReducerTestScenarios<CommonChangeCityNameAction>,
> = [
    {
        name: 'changes the name',
        action: changeCityName({
            cityId: 'city1',
            name: 'Newname',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name: 'Oldname',
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
                        name: 'Newname',
                    },
                },
            });
        },
    },
    {
        name: 'fails when city does not exist',
        action: changeCityName({
            cityId: 'city1',
            name: 'Newname',
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
        action: changeCityName({
            cityId: 'city1',
            name: 'Newname',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name: 'Oldname',
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
    {
        name: 'fails when the name is too short',
        action: changeCityName({
            cityId: 'city1',
            name: 'Ne',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name: 'Oldname',
                    ownerId: 'player1',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city name is too short'],
            });
        },
    },
    {
        name: 'fails when the name is too long',
        action: changeCityName({
            cityId: 'city1',
            name: 'NewnameNewnameNewnameNewnameNewname',
            playerId: 'player1',
        }),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                    name: 'Oldname',
                    ownerId: 'player1',
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return failure({
                errors: ['the city name is too long'],
            });
        },
    },
    {
        name: 'fails when the name does not start with a capital letter',
        action: changeCityName({
            cityId: 'city1',
            name: 'newname',
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
            return failure({
                errors: ['the city name does not follow the convention'],
            });
        },
    },
];
