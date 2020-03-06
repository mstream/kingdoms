// @flow

import type {ServerStateReducerResult} from './root';
import {rootReducer} from './root';
import type {ServerState} from '../../../../common/src/state';
import {initialServerState} from '../state';
import {dummy} from '../../../../common/src/actions';
import {emptyServerState} from '../../../../common/src/state';

describe('rootReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            ...emptyServerState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: ServerStateReducerResult<ServerState> = {
            errors: [],
            state: initialServerState,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();
        const previousState: ServerState = {
            ...emptyServerState,
        };
        const expected: ServerStateReducerResult<ServerState> = {
            errors: [],
            state: previousState,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
