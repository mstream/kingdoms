// @flow

import type { CommonState, CommonStateCities } from '../state/state';
import {
    emptyCitiesState,
    emptyCityState,
    emptyCommonState,
} from '../state/state';
import { commonStateCitiesSelector } from './common-state';

describe('commonStateCitiesSelector', () => {
    it('returns all the cities', () => {
        const state: CommonState = {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                '1': {
                    ...emptyCityState,
                },
                '2': {
                    ...emptyCityState,
                },
            },
        };

        const expected: CommonStateCities = {
            '1': {
                ...emptyCityState,
            },
            '2': {
                ...emptyCityState,
            },
        };

        const actual = commonStateCitiesSelector(state);

        expect(actual).toEqual(expected);
    });
});