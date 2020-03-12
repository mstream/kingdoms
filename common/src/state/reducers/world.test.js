// @flow

import {worldReducer} from './world';
import { emptyCommonState, initialCommonState } from '../index';
import type {CommonStateReducerResult} from './root';
import {success} from './root';
import {dummy} from '../../../../common/src/actions';
import type { CommonState, CommonStateWorld } from '../index';

describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: CommonState = {
            ...emptyCommonState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: CommonStateReducerResult<CommonStateWorld> = {
            errors: [],
            state: initialCommonState.world,
        };
        const actual = worldReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();

        const previousState: CommonState = {
            ...emptyCommonState,
        };
        success({state: previousState.world});
        const actual = worldReducer({action, state: previousState});
        const expected: CommonStateReducerResult<CommonStateWorld> = {
            errors: [],
            state: previousState.world,
        };
        expect(actual).toEqual(expected);
    });
});
