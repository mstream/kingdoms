// @flow

import {
    commonStateCitiesSelectors,
} from '../../../../../../../../../../common/src/state/modules/_children/cities/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    CitiesDistances,
} from '../../../../../../../../../../common/src/state/modules/_children/cities/types';
import type {
    ClientStateSelector,
} from '../../../../../types';

type Selector = ClientStateSelector< ?CitiesDistances, void >;

export const citiesDistancesSelector: Selector
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateCitiesSelectors.citiesDistances,
        },
    );
