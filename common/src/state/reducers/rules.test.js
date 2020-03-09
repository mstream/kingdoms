// @flow

import {rulesReducer} from './rules';
import {initialCommonState} from '../state';
import type {CommonStateRules, CommonState} from '../../../../common/src/state';
import {worldReducer} from './world';
import type {CommonStateReducerResult} from './root';
import {dummy} from '../../../../common/src/actions';
import {emptyCommonState} from '../../../../common/src/state';

describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: CommonState = {
            ...emptyCommonState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: CommonStateReducerResult<CommonStateRules> = {
            errors: [],
            state: initialCommonState.rules,
        };
        const actual = rulesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();

        const previousState: CommonState = {
            ...emptyCommonState,
        };
        const expected: CommonStateReducerResult<CommonStateRules> = {
            errors: [],
            state: previousState.rules,
        };

        const actual = rulesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
