// @flow

import {
    commonStateCitiesSelectors,
} from '../../../../../../../../common/src/state/modules/_children/cities/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    CitiesDistances,
} from '../../../../../../../../common/src/state/modules/_children/cities/selectors/types';
import type {
    ClientStateSelector,
} from '../../../../../types';


export const citiesDistancesSelector: ClientStateSelector< ?CitiesDistances, void >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateCitiesSelectors.citiesDistances,
        },
    );
