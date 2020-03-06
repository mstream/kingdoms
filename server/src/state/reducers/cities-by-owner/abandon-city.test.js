// @flow

import {abandonCity} from '../../../../../common/src/actions';
import type {ServerState} from '../../../../../common/src/state';
import {abandonCityCitiesByOwnerReducer} from './abandon-city';
import {emptyServerState} from '../../../../../common/src/state';

describe('abandonCityCitiesByOwnerReducer', () => {
    it('removes the city', () => {
        const action = abandonCity({cityId: '1', playerId: 'player1'});
        const previousState: ServerState = {
            ...emptyServerState,
            citiesByOwner: {
                'player1': ['1', '2']
            }
        };
        const expected = {
            errors: [],
            state: {
                ...previousState.cities,
                'player1': [
                    '2'
                ]
            },
        };
        const actual = abandonCityCitiesByOwnerReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});