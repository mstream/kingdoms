// @flow

import type {
    CommonStateCities,
} from '../../reducer/types';
import type {
    CommonStateSelector,
} from '../../../../types';

export const citiesSelector: CommonStateSelector< CommonStateCities, void > = (
    state,
) => {

    return state.cities;

};
