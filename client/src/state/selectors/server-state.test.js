// @flow

import type {CommonStateCity, ServerState} from '../../../../common/src/state';
import {emptyCityState, emptyServerState} from '../../../../common/src/state';
import {
    serverStatePlayerCitiesSelector,
    serverStatePlayerCityIdsSelector
} from './server-state';

describe('serverStatePlayerCityIdsSelector', () => {
    it('returns all the city ids owned by the player', () => {
        const state: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
                '2': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
                '3': {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
            }
        };

        const expected: $ReadOnlyArray<string> = ['1', '3'];

        const actual = serverStatePlayerCityIdsSelector(state, {playerName: 'player1'});

        expect(actual).toEqual(expected);
    });
});


describe('serverStatePlayerCitiesSelector', () => {
    it('returns all the cities owned by the player', () => {
        const state: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
                '2': {
                    ...emptyCityState,
                    ownerId: 'player2',
                },
                '3': {
                    ...emptyCityState,
                    ownerId: 'player1',
                },
            }
        };

        const expected: $ReadOnlyArray<CommonStateCity> = [
            {
                ...emptyCityState,
                ownerId: 'player1',
            },
            {
                ...emptyCityState,
                ownerId: 'player1',
            },
        ];

        const actual = serverStatePlayerCitiesSelector(state, {playerName: 'player1'});

        expect(actual).toEqual(expected);
    });
});
