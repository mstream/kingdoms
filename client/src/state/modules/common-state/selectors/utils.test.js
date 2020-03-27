// @flow

import { createClientStateCommonStateSelector } from './utils';
import type { CommonStateSelector } from '../../../../../../common/src/state/modules/types';
import type { ClientState } from '../../types';
import { emptyClientState } from '../../state';
import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import type { Vector } from '../../../../../../common/src/vector';

describe('createClientStateCommonStateSelector', () => {
    it('returns null when common state is not loaded', () => {

        const state: ClientState = {
            ...emptyClientState,
            commonState: null,
        };

        const commonStateSelector: CommonStateSelector<Vector> = (state) => {
            return state.rules.minimalCityMargin;
        };

        const selector = createClientStateCommonStateSelector({
            commonStateSelector,
        });

        const expected = null;

        const actual = selector(state);

        expect(actual).toEqual(expected);
    });

    it('returns desired value using the provided common state selector', () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                rules: {
                    ...emptyCommonState.rules,
                    minimalCityMargin: {
                        x: 3,
                        y: 3,
                    },
                },
            },
        };

        const commonStateSelector: CommonStateSelector<Vector> = (state) => {
            return state.rules.minimalCityMargin;
        };

        const selector = createClientStateCommonStateSelector({
            commonStateSelector,
        });

        const expected = {
            x: 3,
            y: 3,
        };

        const actual = selector(state);

        expect(actual).toEqual(expected);
    });

});