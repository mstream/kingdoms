/**
 * @flow
 */

import {resetState} from '../../../../../common/src/actions';
import {emptyState, initialState} from '../../state';
import {resetStateCitiesReducer} from './reset-state';
import type {ServerState} from '../../../../../common/src/state';

describe('resetStateCitiesReducer', () => {
    it('returns the initial state', () => {
        const action = resetState();
        const previousState: ServerState = emptyState;
        const expected = {
            errors: [],
            state: initialState.cities,
        };
        const actual = resetStateCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});