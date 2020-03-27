// @flow

import { createSelector } from 'reselect';
import type { ClientState, ClientStateSelector } from '../../types';
import { clientStateMenuSelectors } from '../../menu/selectors';
import { cityIdsOwnedByPlayerSelector } from './city-ids-owned-by-player';


export const nextCityIdSelector: ClientStateSelector<?string> =
    createSelector<ClientState, void, ?string, ?$ReadOnlyArray<string>, ?string>(
        cityIdsOwnedByPlayerSelector,
        clientStateMenuSelectors.currentlyViewedCityId,
        (citiesOwnedByPlayer, currentlyViewedCityId) => {
            if (citiesOwnedByPlayer == null || currentlyViewedCityId == null) {
                return null;
            }

            if (citiesOwnedByPlayer.length < 2) {
                return null;
            }

            const sortedCityIds = [...citiesOwnedByPlayer].sort();
            const currentlyViewedCityIndex = sortedCityIds.indexOf(currentlyViewedCityId);
            return currentlyViewedCityIndex === citiesOwnedByPlayer.length - 1 ? sortedCityIds[0] : sortedCityIds[currentlyViewedCityIndex + 1];
        },
    );