// @flow

import {dummy, updateState} from '../actions';
import type {ClientState, ClientStateTiles} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {playerReducer} from './player';
import {tilesReducer} from './tiles';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../common/src/state';

describe('playerReducer', () => {
    it('initializes its state', () => {
        const action = dummy();

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
        const commonState = {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                },
                '2': {
                    ...emptyCityState,
                }
            },
            world: {
                ...emptyCommonState.world,
                size: {
                    x: 1,
                    y: 1,
                }
            }
        };

        const action = updateState({commonState});

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
