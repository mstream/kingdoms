// @flow

import type {
    CommonStateSelector,
} from '../../../../types';
import type {
    Vector,
} from '../../../../../../vector';

export const minimalCityMarginSelector: CommonStateSelector< Vector, void > = (
    state,
) => {

    return state.rules.minimalCityMargin;

};
