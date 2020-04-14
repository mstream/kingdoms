// @flow

import type {
    CommonStateSelector,
} from '../../../types';
import type {
    Vector,
} from '../../../../../vector';

export const minimalCityMarginSelector: CommonStateSelector< Vector > = (
    state,
) => {

    return state.rules.minimalCityMargin;

};
