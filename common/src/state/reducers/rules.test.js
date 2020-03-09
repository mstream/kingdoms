// @flow

import {rulesReducer} from './rules';
import {initialCommonstate} from '../state';
import type {CommonStateRules, CommonState} from '../../../../common/src/state';
import {worldReducer} from './world';
import type {CommonstateReducerResult} from './root';
import {dummy} from '../../../../common/src/actions';
import {emptyCommonstate} from '../../../../common/src/state';

describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: CommonState = {
            ...emptyCommonstate,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: CommonstateReducerResult<CommonStateRules> = {
            errors: [],
            state: initialCommonstate.rules,
        };
        const actual = rulesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();

        const previousState: CommonState = {
            ...emptyCommonstate,
        };
        const expected: CommonstateReducerResult<CommonStateRules> = {
            errors: [],
            state: previousState.rules,
        };

        const actual = rulesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
