// @flow

import {worldReducer} from './world';
import {emptyServerState, initialServerState} from '../state';
import type {CommonStateWorld, ServerState} from '../../../../common/src/state';
import type {ServerStateReducerResult} from './root';
import {success} from './root';
import {dummy} from '../../../../common/src/actions';describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            ...emptyServerState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: ServerStateReducerResult<CommonStateWorld> = {
            errors: [],
            state: initialServerState.world,
        };
        const actual = worldReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();

        const previousState: ServerState = {
            ...emptyServerState,
        };
        success({state: previousState.world});
        const actual = worldReducer({action, state: previousState});
        const expected: ServerStateReducerResult<CommonStateWorld> = {
            errors: [],
            state: previousState.world,
        };
        expect(actual).toEqual(expected);
    });
});
