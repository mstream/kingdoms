// @flow

import type {ServerState} from '../../../../../common/src/state';
import {unsupportedActionCitiesReducer} from './unsupported';
import {emptyServerState} from '../../state';
import {dummy} from '../../../../../client/src/state/actions';

describe('unsupportedActionCitiesReducer', () => {
    it('returns the current state', () => {
        const action = dummy();
        const previousState: ServerState = {
            ...emptyServerState,
        };
        const expected = {
            errors: [],
            state: previousState.cities,
        };
        const actual = unsupportedActionCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });
});