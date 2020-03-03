// @flow

import type {ServerState} from '../../../../../common/src/state';
import {unsupportedActionCitiesByOwnerReducer} from './unsupported';
import {emptyServerState} from '../../state';

describe('unsupportedActionCitiesByOwnerReducer', () => {
    it('returns the current state', () => {
        const action = {
            type: '_DUMMY_',
        };
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