// @flow

import {rulesReducer} from './rules';
import {initialServerState} from '../state';
import type {CommonStateRules, ServerState} from '../../../../common/src/state';
import {worldReducer} from './world';
import type {ServerStateReducerResult} from './root';
import {dummy} from '../../../../common/src/actions';
import {emptyServerState} from '../../../../common/src/state';

describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            ...emptyServerState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: ServerStateReducerResult<CommonStateRules> = {
            errors: [],
            state: initialServerState.rules,
        };
        const actual = rulesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();

        const previousState: ServerState = {
            ...emptyServerState,
        };
        const expected: ServerStateReducerResult<CommonStateRules> = {
            errors: [],
            state: previousState.rules,
        };

        const actual = rulesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
