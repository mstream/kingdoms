/**
 * @flow
 */

import {emptyState, initialState} from '../state';
import {timeReducer} from './time';
import type {CommonStateTime, ServerState} from '../../../../common/src/state';
import {worldReducer} from './world';
import {executeTimeStep} from '../../../../common/src/actions';
import type {ServerStateReducerResult} from './root';

describe('worldReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            ...emptyState,
        };
        const expected: ServerStateReducerResult<CommonStateTime> = {
            errors: [],
            state: initialState.time,
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = {
            type: '_DUMMY_',
        };
        const previousState: ServerState = {
            ...emptyState,
        };
        const expected: ServerStateReducerResult<CommonStateTime> = {
            errors: [],
            state: previousState.time,
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('updates time on execute time step action', () => {
        const action = executeTimeStep({time: 'NEW_TIME'});
        const previousState: ServerState = {
            ...emptyState,
            time: '2000-01-01T00:00:00Z',
        };
        const expected: ServerStateReducerResult<CommonStateTime> = {
            errors: [],
            state: 'NEW_TIME',
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
