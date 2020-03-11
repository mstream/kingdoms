// @flow

import {unsupportedActionCitiesReducer} from './unsupported';
import {dummy} from '../../../../../client/src/state/actions';
import { emptyCommonState } from '../../state';
import type { CommonState } from '../../state';

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