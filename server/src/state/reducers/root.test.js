/**
 * @flow
 */

import type {ServerStateReducerResult} from './root';
import {rootReducer} from './root';
import type {ServerState} from '../../../../common/src/state';
import {emptyState, initialState} from '../state';

describe('rootReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            ...emptyState,
        };
        const expected: ServerStateReducerResult<ServerState> = {
            errors: [],
            state: initialState,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = {
            type: '_DUMMY_',
        };
        const previousState: ServerState = {
            ...emptyState,
        };
        const expected: ServerStateReducerResult<ServerState> = {
            errors: [],
            state: previousState,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
