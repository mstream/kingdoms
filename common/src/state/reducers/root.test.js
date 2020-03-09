// @flow

import type {CommonstateReducerResult} from './root';
import {rootReducer} from './root';
import type {CommonState} from '../../../../common/src/state';
import {initialCommonstate} from '../state';
import {dummy} from '../../../../common/src/actions';
import {emptyCommonstate} from '../../../../common/src/state';

describe('rootReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: CommonState = {
            ...emptyCommonstate,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: CommonstateReducerResult<CommonState> = {
            errors: [],
            state: initialCommonstate,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();
        const previousState: CommonState = {
            ...emptyCommonstate,
        };
        const expected: CommonstateReducerResult<CommonState> = {
            errors: [],
            state: previousState,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
