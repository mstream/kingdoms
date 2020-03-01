/**
 * @flow
 */

import type {ServerState} from '../../../../../common/src/state';
import {unsupportedActionCitiesReducer} from './unsupported';
import {emptyState} from '../../state';

describe('unsupportedActionCitiesReducer', () => {
    it('returns the current state', () => {
        const action = {
            type: '_DUMMY_',
        };
        const previousState: ServerState = emptyState;
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