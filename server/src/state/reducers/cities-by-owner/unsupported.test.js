// @flow

import type {ServerState} from '../../../../../common/src/state';
import {unsupportedActionCitiesByOwnerReducer} from './unsupported';
import {emptyServerState} from '../../state';
import {dummy} from '../../../../../client/src/state/actions';

describe('unsupportedActionCitiesByOwnerReducer', () => {
    it('returns the current state', () => {
        const action = dummy();
        const previousState: ServerState = {
            ...emptyServerState,
        };
        const expected = {
            errors: [],
            state: previousState.citiesByOwner,
        };
        const actual = unsupportedActionCitiesByOwnerReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });
});