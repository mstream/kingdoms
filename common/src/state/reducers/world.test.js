// @flow

import {worldReducer} from './world';
import {initialCommonstate} from '../state';
import type {CommonStateWorld, CommonState} from '../../../../common/src/state';
import type {CommonstateReducerResult} from './root';
import {success} from './root';
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
        const expected: CommonstateReducerResult<CommonStateWorld> = {
            errors: [],
            state: initialCommonstate.world,
        };
        const actual = worldReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();

        const previousState: CommonState = {
            ...emptyCommonstate,
        };
        success({state: previousState.world});
        const actual = worldReducer({action, state: previousState});
        const expected: CommonstateReducerResult<CommonStateWorld> = {
            errors: [],
            state: previousState.world,
        };
        expect(actual).toEqual(expected);
    });
});
