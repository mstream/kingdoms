// @flow


import type { ClientStateSelector } from '../../../types';
import { commonStateCitiesSelectors } from '../../../../../../../common/src/state/modules/cities/selectors';
import { createClientStateCommonStateSelector } from '../utils';
import type { CitiesDistances } from '../../../../../../../common/src/state/modules/cities/selectors/types';

export const citiesDistancesSelector: ClientStateSelector<?CitiesDistances> =
    createClientStateCommonStateSelector({ commonStateSelector: commonStateCitiesSelectors.citiesDistances });