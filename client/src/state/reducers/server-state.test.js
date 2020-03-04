// @flow

import {dummy, updateState} from '../actions';
import type {ClientState} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {initialServerState} from '../../../../server/src/state/state';
import {serverStateReducer} from './server-state';
import type {ServerState} from '../../../../common/src/state';

describe('serverStateReducer', () => {
    it('initializes its state', () => {
        const action = dummy();

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ?ServerState = undefined;

        const expected: ?ServerState = initialClientState.serverState;

        const actual = serverStateReducer(previousLocalState, action, previousGlobalState);

        expect(actual).toEqual(expected);
    });

    it('handles update state event', () => {
        const action = updateState({serverState: initialServerState});
        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };
        const previousLocalState: ?ServerState = previousGlobalState.serverState;
        const expected: ?ServerState = initialServerState;
        const actual = serverStateReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });
});
