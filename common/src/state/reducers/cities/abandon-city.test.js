// @flow

import {abandonCity} from '../../../../../common/src/actions';
import {abandonCityCitiesReducer} from './abandon-city';
import { emptyCityState, emptyCommonState } from '../../index';
import type { CommonState } from '../../index';

describe('abandonCityCitiesReducer', () => {
    it('fails when city does not exist', () => {
        const action = abandonCity({cityId: '1', playerId: 'player1'});
        const previousState: CommonState = {
            ...emptyCommonState,
        };
        const expected = {
            errors: ['the city does not exist'],
            state: null,
        };
        const actual = abandonCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('fails when city does not belong to the player', () => {
        const action = abandonCity({cityId: '1', playerId: 'player1'});
        const previousState: CommonState = {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player2',
                }
            }
        };
        const expected = {
            errors: ['the city does not belong to the player'],
            state: null,
        };
        const actual = abandonCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('removes the ownership', () => {
        const action = abandonCity({cityId: '1', playerId: 'player1'});
        const previousState: CommonState = {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                    ownerId: 'player1',
                }
            }
        };
        const expected = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    ...previousState.cities['1'],
                    ownerId: null,
                }
            },
        };
        const actual = abandonCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});