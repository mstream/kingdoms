// @flow

import {changeCityName} from '../../../../../common/src/actions';
import type {ServerState} from '../../../../../common/src/state';
import {changeCityNameCitiesReducer} from './change-city-name';
import {
    emptyCityState,
    emptyServerState
} from '../../../../../common/src/state';

describe('changeCityNameCitiesReducer', () => {
    it('fails when city does not exist', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newname',
            playerId: 'player1'
        });
        const previousState: ServerState = {
            ...emptyServerState,
        };
        const expected = {
            errors: ['the city does not exist'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when city does not belong to the player', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newname',
            playerId: 'player1'
        });
        const previousState: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    name: 'Oldname',
                    ownerId: 'player2'
                }
            },
        };
        const expected = {
            errors: ['the city does not belong to the player'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when the name is too short', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Ne',
            playerId: 'player1'
        });
        const previousState: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    name: 'Oldname',
                    ownerId: 'player1'
                }
            },
        };
        const expected = {
            errors: ['the city name is too short'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when the name is too long', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'NewnameNewnameNewnameNewnameNewname',
            playerId: 'player1'
        });
        const previousState: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    name: 'Oldname',
                    ownerId: 'player1'
                }
            },
        };
        const expected = {
            errors: ['the city name is too long'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when the name does not follow the convention', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'newname',
            playerId: 'player1'
        });
        const previousState: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    name: 'Oldname',
                    ownerId: 'player1'
                }
            },
        };
        const expected = {
            errors: ['the city name does not follow the convention'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('changes the name', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newname',
            playerId: 'player1'
        });
        const previousState: ServerState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                    name: 'Oldname',
                    ownerId: 'player1'
                }
            },
        };
        const expected = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    ...previousState.cities['1'],
                    name: 'Newname',
                },
            }
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });
});