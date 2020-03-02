// @flow

import {worldReducer} from './world';
import {emptyState, initialState} from '../state';
import type {CommonStateWorld, ServerState} from '../../../../common/src/state';
import type {ServerStateReducerResult} from './root';
import {success} from './root';

describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            ...emptyState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: ServerStateReducerResult<CommonStateWorld> = {
            errors: [],
            state: initialState.world,
        };
        const actual = worldReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = {
            type: '_DUMMY_',
        };
        const previousState: ServerState = {
            ...emptyState,
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
