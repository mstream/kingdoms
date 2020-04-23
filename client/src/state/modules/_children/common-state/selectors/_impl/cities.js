// @flow

import {
    commonStateCitiesSelectors,
} from '../../../../../../../../common/src/state/modules/_children/cities/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateCities,
} from '../../../../../../../../common/src/state/modules/_children/cities/reducer/types';


export const citiesSelector: ClientStateSelector< ?CommonStateCities, void >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateCitiesSelectors.cities,
        },
    );
