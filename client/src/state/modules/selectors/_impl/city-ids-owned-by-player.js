// @flow

import { createSelector } from 'reselect';
import type { ClientState, ClientStateSelector } from '../../types';
import { clientStateCommonStateSelectors } from '../../common-state/selectors';
import { clientStatePlayerSelectors } from '../../player/selectors';
import type { CityIdsByOwner } from '../../../../../../common/src/state/modules/cities/selectors/types';


export const cityIdsOwnedByPlayerSelector: ClientStateSelector<?$ReadOnlyArray<string>> =
    createSelector<ClientState, void, ?$ReadOnlyArray<string>, ?CityIdsByOwner, ?string>(
        clientStateCommonStateSelectors.cityIdsByOwner,
        clientStatePlayerSelectors.name,
        (cityIdsByOwner, playerName) => {
            if (cityIdsByOwner == null || playerName == null) {
                return null;
            }

            const playerCityIds = cityIdsByOwner[playerName];

            return playerCityIds == null ? [] : playerCityIds;
        },
    );
