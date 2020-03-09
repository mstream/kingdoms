// @flow

import type {CommonStateReducerResult} from './root';
import {rootReducer} from './root';
import type {CommonState} from '../../../../common/src/state';
import {initialCommonState} from '../state';
import {dummy} from '../../../../common/src/actions';
import {emptyCommonState} from '../../../../common/src/state';

describe('rootReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: CommonState = {
            ...emptyCommonState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: CommonStateReducerResult<CommonState> = {
            errors: [],
            state: initialCommonState,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();
        const previousState: CommonState = {
            ...emptyCommonState,
        };
        const expected: CommonStateReducerResult<CommonState> = {
            errors: [],
            state: previousState,
        };
        const actual = rootReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
