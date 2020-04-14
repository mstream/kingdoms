// @flow

import type {
    CommonStateSelector,
} from '../../../types';
import type {
    CommonStateCities,
} from '../../reducer/types';

export const citiesSelector: CommonStateSelector< CommonStateCities > = (
    state,
) => {

    return state.cities;

};
