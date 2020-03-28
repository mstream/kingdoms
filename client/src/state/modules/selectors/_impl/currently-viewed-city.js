// @flow

import { createSelector } from 'reselect';
import type {
    CommonStateCities,
    CommonStateCity,
} from '../../../../../../common/src/state/modules/cities/reducer/types';
import { clientStateCommonStateSelectors } from '../../_children/common-state/selectors';
import { clientStateMenuSelectors } from '../../_children/menu/selectors';
import type { ClientState, ClientStateSelector } from '../../../types';


export const currentlyViewedCitySelector: ClientStateSelector<?CommonStateCity> =
    createSelector<ClientState, void, ?CommonStateCity, ?CommonStateCities, ?string>(
        clientStateCommonStateSelectors.cities,
        clientStateMenuSelectors.currentlyViewedCityId,
        (cities, currentlyViewedCityId) => {
            if (cities == null || currentlyViewedCityId == null) {
                return null;
            }

            return cities[currentlyViewedCityId];
        },
    );