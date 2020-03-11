// @flow

import { emptyCommonState, initialCommonState } from '../state';
import {timeReducer} from './time';
import {worldReducer} from './world';
import {executeTimeStep} from '../../../../common/src/actions';
import type {CommonStateReducerResult} from './root';
import {dummy} from '../../../../common/src/actions';
import type { CommonState, CommonStateTime } from '../state';

describe('timeReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: CommonState = {
            ...emptyCommonState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: CommonStateReducerResult<CommonStateTime> = {
            errors: [],
            state: initialCommonState.time,
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();
        const previousState: CommonState = {
            ...emptyCommonState,
        };
        const expected: CommonStateReducerResult<CommonStateTime> = {
            errors: [],
            state: previousState.time,
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('updates time on execute time step action', () => {
        const action = executeTimeStep({time: 'NEW_TIME'});
        const previousState: CommonState = {
            ...emptyCommonState,
            time: '2000-01-01T00:00:00Z',
        };
        const expected: CommonStateReducerResult<CommonStateTime> = {
            errors: [],
            state: 'NEW_TIME',
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
