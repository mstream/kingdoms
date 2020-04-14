// @flow

import {
    commonStateCitiesSelectors,
} from '../../../../../../../../common/src/state/modules/cities/selectors';
import type {
    CityIdsByOwner,
} from '../../../../../../../../common/src/state/modules/cities/selectors/types';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';

export const cityIdsByOwnerSelector: ClientStateSelector< ?CityIdsByOwner > = createClientStateCommonStateSelector(
    {
        commonStateSelector: commonStateCitiesSelectors.cityIdsByOwner,
    },
);
