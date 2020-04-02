// @flow

import type { CommonStateCities } from '../../../../../../../../common/src/state/modules/cities/reducer/types';
import { commonStateCitiesSelectors } from '../../../../../../../../common/src/state/modules/cities/selectors';
import { createClientStateCommonStateSelector } from '../utils';
import type { ClientStateSelector } from '../../../../../types';

export const citiesSelector: ClientStateSelector<?CommonStateCities> = createClientStateCommonStateSelector(
    { commonStateSelector: commonStateCitiesSelectors.cities },
);
