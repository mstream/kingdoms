// @flow

import {loadPlayer, updateState} from '../actions';
import type {
    ClientState,
    ClientStateMenu,
    ClientStatePlayer,
    ClientStateTiles
} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {
    emptyCityState,
    emptyServerState,
    initialServerState
} from '../../../../server/src/state/state';
import {serverStateReducer} from './server-state';
import type {ServerState} from '../../../../common/src/state';
import {playerReducer} from './player';
import {tilesReducer} from './tiles';

describe('playerReducer', () => {
    it('initializes its state', () => {
        const action = {
            type: '_DUMMY_',
        };

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ?ClientStateTiles = undefined;

        const expected: ClientStateTiles = {
            ...initialClientState.tiles,
        };

        const actual = tilesReducer(previousLocalState, action, previousGlobalState);

        expect(actual).toEqual(expected);
    });

    it('handles update state event', () => {
        const serverState = {
            ...emptyServerState,
            cities: {
                '1': {
                    ...emptyCityState,
                },
                '2': {
                    ...emptyCityState,
                }
            },
            world: {
                ...emptyServerState.world,
                size: {
                    x: 1,
                    y: 1,
                }
            }
        };

        const action = updateState({serverState});

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        const previousLocalState: ClientStateTiles = previousGlobalState.tiles;

        const expected: ClientStateTiles = {
            ...previousLocalState,
        };

        const actual = tilesReducer(previousLocalState, action, previousGlobalState);

        // TODO add expectation
        // expect(actual).toEqual(expected);
    });
});
