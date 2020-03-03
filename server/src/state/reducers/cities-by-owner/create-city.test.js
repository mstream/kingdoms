// @flow

import {createCity} from '../../../../../common/src/actions';
import type {ServerState} from '../../../../../common/src/state';
import {createCityCitiesByOwnerReducer} from './create-city';
import {emptyServerState} from '../../state';

describe(`createCityCitiesByOwnerReducer`, () => {
    it(`creates players first city`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Name`,
            playerId: `player1`
        });

        const previousState: ServerState = {
            ...emptyServerState,
        };

        const expected = {
            errors: [],
            state: {
                ...previousState.citiesByOwner,
                'player1': [`1`],
            },
        };
        const actual = createCityCitiesByOwnerReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it(`creates players second city`, () => {
        const action = createCity({
            cityId: `2`,
            cityName: `Name`,
            playerId: `player1`
        });

        const previousState: ServerState = {
            ...emptyServerState,
            citiesByOwner: {
                'player1': [`1`],
            }
        };

        const expected = {
            errors: [],
            state: {
                ...previousState.citiesByOwner,
                'player1': [`1`, `2`],
            },
        };

        const actual = createCityCitiesByOwnerReducer({action, state: previousState});

        expect(actual).toEqual(expected);
    });
});