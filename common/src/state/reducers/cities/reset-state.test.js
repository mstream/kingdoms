// @flow

import {resetState} from '../../../../../common/src/actions';
import {initialCommonstate} from '../../state';
import {resetStateCitiesReducer} from './reset-state';
import type {CommonState} from '../../../../../common/src/state';
import {emptyCommonstate} from '../../../../../common/src/state';

describe('resetStateCitiesReducer', () => {
    it('returns the initial state', () => {
        const action = resetState();
        const previousState: CommonState = {
            ...emptyCommonstate,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected = {
            errors: [],
            state: initialCommonstate.cities,
        };
        const actual = resetStateCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});