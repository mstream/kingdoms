// @flow

import { createSelector } from 'reselect';
import type {
    CommonStateCities,
    CommonStateCity,
} from '../../../../../../common/src/state/modules/cities/reducer/types';
import type { ClientState, ClientStateSelector } from '../../types';
import { clientStateCommonStateSelectors } from '../../common-state/selectors';
import { clientStateMenuSelectors } from '../../menu/selectors';


export const attackedCitySelector: ClientStateSelector<?CommonStateCity> =
    createSelector<ClientState, void, ?CommonStateCity, ?CommonStateCities, ?string>(
        clientStateCommonStateSelectors.cities,
        clientStateMenuSelectors.attackedCityId,
        (cities, attackedCityId) => {
            if (cities == null || attackedCityId == null) {
                return null;
            }

            return cities[attackedCityId];
        },
    );