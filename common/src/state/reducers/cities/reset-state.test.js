// @flow

import {resetState} from '../../../../../common/src/actions';
import { emptyCommonState, initialCommonState } from '../../index';
import {resetStateCitiesReducer} from './reset-state';
import type { CommonState } from '../../index';

describe('resetStateCitiesReducer', () => {
    it('returns the initial state', () => {
        const action = resetState();
        const previousState: CommonState = {
            ...emptyCommonState,
            unsupportedProperty: 'unsupportedPropertyValue',
        };
        const expected = {
            errors: [],
            state: initialCommonState.cities,
        };
        const actual = resetStateCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});