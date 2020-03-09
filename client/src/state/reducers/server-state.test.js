// @flow

import {dummy, updateState} from '../actions';
import type {ClientState} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {commonStateReducer} from './common-state';
import type {CommonState} from '../../../../common/src/state';
import { initialCommonstate } from '../../../../common/src/state/state';

describe('commonStateReducer', () => {
    it('initializes its state', () => {
        const action = dummy();

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ?CommonState = undefined;

        const expected: ?CommonState = initialClientState.commonState;

        const actual = commonStateReducer(previousLocalState, action, previousGlobalState);

        expect(actual).toEqual(expected);
    });

    it('handles update state event', () => {
        const action = updateState({commonState: initialCommonstate});
        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };
        const previousLocalState: ?CommonState = previousGlobalState.commonState;
        const expected: ?CommonState = initialCommonstate;
        const actual = commonStateReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });
});
