// @flow

import type {CommonState} from '../../../../../common/src/state';
import {unsupportedActionCitiesReducer} from './unsupported';
import {dummy} from '../../../../../client/src/state/actions';
import {emptyCommonState} from '../../../../../common/src/state';

describe('unsupportedActionCitiesReducer', () => {
    it('returns the current state', () => {
        const action = dummy();
        const previousState: CommonState = {
            ...emptyCommonState,
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