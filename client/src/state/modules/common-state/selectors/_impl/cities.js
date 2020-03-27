// @flow


import type { ClientStateSelector } from '../../../types';
import type { CommonStateCities } from '../../../../../../../common/src/state/modules/cities/reducer/types';
import { commonStateCitiesSelectors } from '../../../../../../../common/src/state/modules/cities/selectors';
import { createClientStateCommonStateSelector } from '../utils';

export const citiesSelector: ClientStateSelector<?CommonStateCities> =
    createClientStateCommonStateSelector({ commonStateSelector: commonStateCitiesSelectors.cities });