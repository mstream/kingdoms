// @flow

import {initialCommonstate} from '../state';
import {timeReducer} from './time';
import type {CommonStateTime, CommonState} from '../../../../common/src/state';
import {worldReducer} from './world';
import {executeTimeStep} from '../../../../common/src/actions';
import type {CommonstateReducerResult} from './root';
import {dummy} from '../../../../common/src/actions';
import {emptyCommonstate} from '../../../../common/src/state';

describe('timeReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: CommonState = {
            ...emptyCommonstate,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: CommonstateReducerResult<CommonStateTime> = {
            errors: [],
            state: initialCommonstate.time,
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();
        const previousState: CommonState = {
            ...emptyCommonstate,
        };
        const expected: CommonstateReducerResult<CommonStateTime> = {
            errors: [],
            state: previousState.time,
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('updates time on execute time step action', () => {
        const action = executeTimeStep({time: 'NEW_TIME'});
        const previousState: CommonState = {
            ...emptyCommonstate,
            time: '2000-01-01T00:00:00Z',
        };
        const expected: CommonstateReducerResult<CommonStateTime> = {
            errors: [],
            state: 'NEW_TIME',
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
