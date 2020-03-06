// @flow

import {resetState} from '../../../../../common/src/actions';
import {initialServerState} from '../../state';
import {resetStateCitiesReducer} from './reset-state';
import type {ServerState} from '../../../../../common/src/state';
import {emptyServerState} from '../../../../../common/src/state';

describe('resetStateCitiesReducer', () => {
    it('returns the initial state', () => {
        const action = resetState();
        const previousState: ServerState = {
            ...emptyServerState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected = {
            errors: [],
            state: initialServerState.cities,
        };
        const actual = resetStateCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});