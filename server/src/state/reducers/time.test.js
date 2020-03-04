// @flow

import {emptyServerState, initialServerState} from '../state';
import {timeReducer} from './time';
import type {CommonStateTime, ServerState} from '../../../../common/src/state';
import {worldReducer} from './world';
import {executeTimeStep} from '../../../../common/src/actions';
import type {ServerStateReducerResult} from './root';
import {dummy} from '../../../../common/src/actions';describe('timeReducer', () => {
    it('returns the default state on reset state action', () => {
        const action = {
            type: 'RESET_STATE',
        };
        const previousState: ServerState = {
            ...emptyServerState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected: ServerStateReducerResult<CommonStateTime> = {
            errors: [],
            state: initialServerState.time,
        };
        const actual = timeReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns the current state on unsupported action', () => {
        const action = dummy();
        const previousState: ServerState = {
            ...emptyServerState,
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
            ...emptyServerState,
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
