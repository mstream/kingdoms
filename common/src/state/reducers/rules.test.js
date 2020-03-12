// @flow

import {rulesReducer} from './rules';
import { emptyCommonState, initialCommonState } from '../index';
import {worldReducer} from './world';
import type {CommonStateReducerResult} from './root';
import {dummy} from '../../../../common/src/actions';
import type { CommonState, CommonStateRules } from '../index';

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
