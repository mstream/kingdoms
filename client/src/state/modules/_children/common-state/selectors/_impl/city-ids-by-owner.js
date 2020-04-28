// @flow

import {
    commonStateCitiesSelectors,
} from '../../../../../../../../common/src/state/modules/_children/cities/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    CityIdsByOwner,
} from '../../../../../../../../common/src/state/modules/_children/cities/types';
import type {
    ClientStateSelector,
} from '../../../../../types';

export const cityIdsByOwnerSelector: ClientStateSelector< ?CityIdsByOwner, void >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateCitiesSelectors.cityIdsByOwner,
        },
    );
